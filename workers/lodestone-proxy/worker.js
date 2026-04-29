const CACHE_VERSION = "v5";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

const LODESTONE_BASE = "https://jp.finalfantasyxiv.com/lodestone/character";
const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "ja,en;q=0.9",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// 対象の武器強化アチーブメントカテゴリ
const RELIC_CATEGORIES = [62, 63, 64, 66, 68, 75, 81];

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

async function parseCharacterPage(response) {
  let name = "";
  let avatar = "";
  await new HTMLRewriter()
    .on(".frame__chara__name", {
      text(chunk) { name += chunk.text; },
    })
    .on(".frame__chara__face img", {
      element(el) { avatar = el.getAttribute("src") ?? ""; },
    })
    .transform(response)
    .arrayBuffer();
  return { name: name.trim(), avatar };
}

async function parseAchievementPage(response) {
  const ids = [];
  let lastPage = 1;
  let isPrivate = false;

  await new HTMLRewriter()
    .on('a.entry__achievement--complete', {
      element(el) {
        const href = el.getAttribute("href") ?? "";
        const m = href.match(/\/achievement\/detail\/(\d+)\//);
        if (m) ids.push(parseInt(m[1], 10));
      },
    })
    .on(".btn__pager__current", {
      text(chunk) {
        const m = chunk.text.match(/\/\s*(\d+)/);
        if (m) lastPage = Math.max(lastPage, parseInt(m[1], 10));
      },
    })
    .on(".parts__zero", {
      element() { isPrivate = true; },
    })
    .transform(response)
    .arrayBuffer();

  return { ids, lastPage, isPrivate };
}

async function fetchCategory(lodestoneId, category, page = 1) {
  const url = `${LODESTONE_BASE}/${lodestoneId}/achievement/category/${category}/${page > 1 ? `?page=${page}` : ""}`;
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (!res.ok) return { ids: [], lastPage: 1, isPrivate: false, httpStatus: res.status };
  const data = await parseAchievementPage(res);
  return { ...data, httpStatus: 200 };
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    const match = url.pathname.match(/^\/character\/(\d+)$/);
    if (!match) return jsonResponse({ error: "Not found" }, 404);

    const lodestoneId = match[1];
    const isDebug = url.searchParams.has("debug");

    const cache = caches.default;
    const cacheKey = new Request(`${url.origin}/character/${lodestoneId}?${CACHE_VERSION}`);
    if (!isDebug) {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    }

    try {
      // キャラクター情報と全カテゴリの page 1 を並列取得
      const [charRes, ...cat1Results] = await Promise.all([
        fetch(`${LODESTONE_BASE}/${lodestoneId}/`, { headers: FETCH_HEADERS }),
        ...RELIC_CATEGORIES.map(cat => fetchCategory(lodestoneId, cat, 1)),
      ]);

      if (!charRes.ok) return jsonResponse({ error: "キャラクターが見つかりません" }, 404);

      const { name, avatar } = await parseCharacterPage(charRes);

      // デバッグ用: カテゴリ・ページごとの取得ログ
      const debugLog = RELIC_CATEGORIES.map((cat, i) => ({
        category: cat,
        page: 1,
        count: cat1Results[i].ids.length,
        lastPage: cat1Results[i].lastPage,
        isPrivate: cat1Results[i].isPrivate,
        httpStatus: cat1Results[i].httpStatus,
        ids: cat1Results[i].ids,
      }));

      // アチーブメント非公開チェック（全カテゴリで取得件数0かつ非公開/403 なら非公開扱い）
      const allPrivate = cat1Results.every(r => r.ids.length === 0 && (r.isPrivate || r.httpStatus === 403));
      if (allPrivate) {
        return jsonResponse({
          id: Number(lodestoneId), name, avatar,
          achievements: { public: false, ids: [] },
          ...(isDebug ? { debug: debugLog } : {}),
        });
      }

      const allIds = cat1Results.flatMap(r => r.ids);

      // ページが複数あるカテゴリを追加取得
      const extraFetches = [];
      RELIC_CATEGORIES.forEach((cat, i) => {
        const { lastPage, isPrivate } = cat1Results[i];
        if (!isPrivate && lastPage > 1) {
          for (let p = 2; p <= lastPage; p++) {
            extraFetches.push({ cat, page: p, promise: fetchCategory(lodestoneId, cat, p) });
          }
        }
      });

      if (extraFetches.length > 0) {
        const extraResults = await Promise.all(extraFetches.map(e => e.promise));
        extraResults.forEach((r, i) => {
          allIds.push(...r.ids);
          debugLog.push({
            category: extraFetches[i].cat,
            page: extraFetches[i].page,
            count: r.ids.length,
            lastPage: r.lastPage,
            isPrivate: r.isPrivate,
            httpStatus: r.httpStatus,
            ids: r.ids,
          });
        });
      }

      const payload = {
        id: Number(lodestoneId),
        name,
        avatar,
        achievements: { public: true, ids: [...new Set(allIds)] },
        ...(isDebug ? { debug: debugLog } : {}),
      };

      const response = jsonResponse(payload);
      if (!isDebug) await cache.put(cacheKey, response.clone());
      return response;
    } catch (e) {
      return jsonResponse({ error: String(e) }, 500);
    }
  },
};
