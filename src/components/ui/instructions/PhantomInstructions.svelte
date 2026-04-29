<script context="module">
  import { base } from "../../../lib/base.js";
  const _cache = { stepsData: null, itemsMap: {}, questsMap: {} };
  let _loadPromise = null;

  function getPwData() {
    if (_cache.stepsData) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = Promise.all([
        fetch(`${base}/data/pw/steps.json`).then(r => r.json()),
        fetch(`${base}/data/pw/items.json`).then(r => r.json()),
        fetch(`${base}/data/pw/quests.json`).then(r => r.json()),
      ]).then(([stepsData, itemsData, questsData]) => {
        for (const it of itemsData) _cache.itemsMap[it.id] = it;
        for (const q of questsData) _cache.questsMap[q.id] = q;
        _cache.stepsData = stepsData;
        return _cache;
      });
    }
    return _loadPromise;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { selectedJob } from "../../../stores/selection.js";
  import { weaponMetas } from "../../../stores/progress.js";
  import { iconUrl, itemUrl, questUrl } from "./_helpers.js";
  import { loadCurrencies } from "../../../stores/currencies.js";
  import PwHowCell from "./pw/PwHowCell.svelte";

  export let stepIndex;

  const STAGE_INDEX = { penumbra: 0, umbra: 1, obscurum: 2 };

  let stepsData = null;
  let itemsMap = {};
  let questsMap = {};
  let currencies = null;
  let loaded = false;

  onMount(async () => {
    const [d, cur] = await Promise.all([getPwData(), loadCurrencies()]);
    stepsData = d.stepsData;
    itemsMap = d.itemsMap;
    questsMap = d.questsMap;
    currencies = cur;
    loaded = true;
  });

  $: sd = stepsData?.[stepIndex] ?? null;
  $: pwMeta = $weaponMetas["PW"];

  function renderBodyParts(bodyParts) {
    return bodyParts.map(part => {
      if (part.type === "text") return part.html;
      if (part.type === "quest") {
        const q = questsMap[part.id];
        const name = q?.name ?? `クエスト #${part.id}`;
        const iconId = questsMap[part.id]?.iconId ?? 71221;
        return `<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src="${iconUrl(iconId)}" alt="">`
             + `<a class="eorzeadb_link" href="${questUrl(part.id)}" target="_blank" rel="noopener">${name}</a>`;
      }
      if (part.type === "item") {
        const it = itemsMap[part.id];
        if (!it) return `アイテム #${part.id}`;
        const url = itemUrl(part.id);
        const icon = `<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src="${iconUrl(it.iconId)}" alt="">`;
        if (!url.endsWith("/db/item/")) {
          return `${icon}<a class="eorzeadb_link" href="${url}" target="_blank" rel="noopener">${it.name}</a>`;
        }
        return `${icon}${it.name}`;
      }
      return "";
    }).join("");
  }

  function buildWeaponsHtml(weaponList) {
    if (!weaponList || weaponList.length === 0) return "<strong>（前段階の武器）</strong>";
    return weaponList.map(w => {
      const icon = w.iconId
        ? `<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src="${iconUrl(w.iconId)}" alt="">`
        : "";
      if (w.id) {
        const url = itemUrl(w.id);
        if (!url.endsWith("/db/item/")) {
          return `${icon}<a class="eorzeadb_link" href="${url}" target="_blank" rel="noopener">${w.nameJa}</a>`;
        }
        return `${icon}<a class="eorzeadb_link" href="https://garlandtools.org/db/#item/${w.id}" target="_blank" rel="noopener">${w.nameJa}</a>`;
      }
      return `${icon}<strong>${w.nameJa}</strong>`;
    }).join(" ＆ ");
  }

  function buildPerWeaponBody(pw, job) {
    const q = questsMap[pw.questId];
    const questName = q?.name ?? `クエスト #${pw.questId}`;
    const questIconId = questsMap[pw.questId]?.iconId ?? 71221;
    const questHtml =
      `<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src="${iconUrl(questIconId)}" alt="">` +
      `<a class="eorzeadb_link" href="${questUrl(pw.questId)}" target="_blank" rel="noopener">${questName}</a>`;

    const oreItem = itemsMap[pw.oreItemId];
    const oreIcon = oreItem?.iconId
      ? `<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src="${iconUrl(oreItem.iconId)}" alt="">`
      : "";
    const oreUrl = itemUrl(pw.oreItemId);
    const oreHtml = !oreUrl.endsWith("/db/item/")
      ? `${oreIcon}<a class="eorzeadb_link" href="${oreUrl}" target="_blank" rel="noopener">${oreItem?.name ?? ""}</a>`
      : `${oreIcon}${oreItem?.name ?? ""}`;

    if (pw.prevStageKey) {
      const prevIdx = STAGE_INDEX[pw.prevStageKey] ?? 0;
      const prevWeapons = pwMeta?.[job]?.[prevIdx]?.items ?? [];
      return `${questHtml} を受注し、${buildWeaponsHtml(prevWeapons)} と${oreHtml} ×${pw.oreQty} を NPC <strong>ドドックリ</strong> に渡す。`;
    }
    return `${questHtml} を受注し、${oreHtml} ×${pw.oreQty} を 蜃気楼の町 の NPC <strong>ドドックリ</strong> に渡す。`;
  }

  function oreItemHtml(oreItemId) {
    const it = itemsMap[oreItemId];
    if (!it) return `アイテム #${oreItemId}`;
    const icon = it.iconId
      ? `<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src="${iconUrl(it.iconId)}" alt="">`
      : "";
    const url = itemUrl(oreItemId);
    if (!url.endsWith("/db/item/")) {
      return `${icon}<a class="eorzeadb_link" href="${url}" target="_blank" rel="noopener">${it.name}</a>`;
    }
    return `${icon}${it.name}`;
  }
</script>

{#if !loaded}
  <div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
{:else if sd}
  <ol class="list-decimal space-y-4 pl-5">
    {#each sd.onetime as ot}
      {@const hasQty = ot.items.some(item => item.qty != null)}
      <li class="pl-1 space-y-2">
        <p class="font-medium leading-snug">
          {ot.heading}
          <span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span>
        </p>
        <p class="leading-relaxed">{@html renderBodyParts(ot.bodyParts)}</p>
        <table class="text-xs border-collapse border border-gs-border w-full">
          <thead>
            <tr class="bg-white/10">
              <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">{ot.nameLabel ?? "素材名"}</th>
              {#if hasQty}<th class="border border-gs-border px-2 py-1 text-center font-semibold">個数</th>{/if}
              <th class="border border-gs-border px-2 py-1 text-left font-semibold">{ot.howLabel ?? "場所"}</th>
            </tr>
          </thead>
          <tbody>
            {#each ot.items as item}
              {@const itData = item.itemId ? itemsMap[item.itemId] : null}
              <tr>
                <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle">
                  {#if itData?.iconId}
                    <img src={iconUrl(itData.iconId)} alt="" class="inline-block w-4 h-4 object-contain align-middle mr-0.5" />
                  {/if}
                  {#if itData && item.itemId}
                    {@const url = itemUrl(item.itemId)}
                    {#if !url.endsWith("/db/item/")}
                      <a href={url} target="_blank" rel="noopener" class="eorzeadb_link">{itData.name}</a>
                    {:else}
                      {itData.name}
                    {/if}
                  {:else}
                    {item.name ?? ""}
                  {/if}
                </td>
                {#if hasQty}
                  <td class="border border-gs-border px-2 py-1 text-center whitespace-nowrap">
                    {item.qty != null ? `×${item.qty}` : ""}
                  </td>
                {/if}
                <td class="border border-gs-border px-2 py-1">
                  <PwHowCell how={item.how} {currencies} />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if ot.note}
          <p class="text-xs text-gs-muted">{ot.note}</p>
        {/if}
      </li>
    {/each}

    <li class="pl-1 space-y-2">
      <p class="font-medium leading-snug">
        武器ごとに繰り返す
        <span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span>
      </p>
      <p class="leading-relaxed">{@html buildPerWeaponBody(sd.perWeapon, $selectedJob)}</p>
      <p class="text-xs text-gs-muted mt-1">
        ※ {@html oreItemHtml(sd.perWeapon.oreItemId)} は<PwHowCell how={sd.perWeapon.oreHow} {currencies} />できます。
      </p>
    </li>
  </ol>
{/if}
