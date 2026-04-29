<script context="module">
  import { base } from "../../../lib/base.js";
  let _cache = null;
  let _loadPromise = null;

  function getAwData() {
    if (_cache) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = Promise.all([
        fetch(`${base}/data/aw/items.json`).then(r => r.json()),
        fetch(`${base}/data/aw/quests.json`).then(r => r.json()),
        fetch(`${base}/data/aw/steps.json`).then(r => r.json()),
      ]).then(([items, quests, steps]) => {
        _cache = { items, quests, steps };
        return _cache;
      });
    }
    return _loadPromise;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { ITEM_NAMES, INSTANCE_NAMES, ITEM_ICONS, makeHelpers, iconUrl, questUrl, itemUrl, instanceUrl } from "./_helpers.js";
  import { loadCurrencies } from "../../../stores/currencies.js";

  export let step;
  export let stepIndex;
  export let steps;

  $: ({ partial, itemIconUrl, questIconUrl, buildPrevItemLinks } = makeHelpers(step));
  $: jobJa = step.jobNameJa ?? "";
  $: prevItemLinks = buildPrevItemLinks(steps, stepIndex);

  function iIcon(id) { return ITEM_ICONS[id] ? iconUrl(ITEM_ICONS[id]) : ""; }

  let awItems = { luminousCrystals: [], materials: [], mysteryCommonExchanges: [], crystalSandExchanges: [] };
  let awQuests = {};
  let awStepsData = [];
  let currencies = null;
  let loaded = false;

  onMount(async () => {
    const [d, cur] = await Promise.all([getAwData(), loadCurrencies()]);
    awItems = d.items;
    awQuests = d.quests;
    awStepsData = d.steps;
    currencies = cur;
    loaded = true;
  });

  function qIcon(id) { return awQuests[id] ? iconUrl(awQuests[id].iconId) : ""; }
  function qName(id) { return awQuests[id]?.name ?? `クエスト #${id}`; }

  $: q0 = step.quests?.[0];
  $: sd = awStepsData[stepIndex] ?? null;
</script>

{#if !loaded}
<div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
{:else if stepIndex === 0}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アジス・ラー</strong>の<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>レヴナンツトール</strong>の<strong>シンドニー</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(q0?.usedItems?.[0])} alt=""><a class="eorzeadb_link" href={itemUrl(q0?.usedItems?.[0])} target="_blank" rel="noopener">{partial(q0?.usedItems?.[0], "item")}</a>と<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(q0?.usedItems?.[1])} alt=""><a class="eorzeadb_link" href={itemUrl(q0?.usedItems?.[1])} target="_blank" rel="noopener">{partial(q0?.usedItems?.[1], "item")}</a>を入手する。</p>
    <table class="text-sm border-collapse border border-gs-border mt-1">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">交換品</th>
        </tr>
      </thead>
      <tbody>
        {#each awItems.luminousCrystals as c}
          <tr>
            <td class="border border-gs-border px-2 py-1"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(c.itemId)} alt=""><a class="eorzeadb_link" href={itemUrl(c.itemId)} target="_blank" rel="noopener">{c.name}</a></td>
            <td class="border border-gs-border px-2 py-1">{c.zone}</td>
            <td class="border border-gs-border px-2 py-1"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(c.crystalItemId)} alt=""><a class="eorzeadb_link" href={itemUrl(c.crystalItemId)} target="_blank" rel="noopener">{c.crystalName}</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>アルダシール</strong>に<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(q0?.usedItems?.[0])} alt=""><a class="eorzeadb_link" href={itemUrl(q0?.usedItems?.[0])} target="_blank" rel="noopener">{partial(q0?.usedItems?.[0], "item")}</a>と<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(q0?.usedItems?.[1])} alt=""><a class="eorzeadb_link" href={itemUrl(q0?.usedItems?.[1])} target="_blank" rel="noopener">{partial(q0?.usedItems?.[1], "item")}</a>を渡す。</p>
  </li>
</ol>

{:else if stepIndex === 1}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  {#each sd?.instanceGroups ?? [] as group}
    <li class="pl-1 space-y-1">
      <p>{@html prevItemLinks}を装備して、下記 ID を順番にクリアする。</p>
      <ol class="list-decimal list-inside space-y-1 ml-2">
        {#each group as id}
          <li><a class="eorzeadb_link" href={instanceUrl(id)} target="_blank" rel="noopener">{INSTANCE_NAMES[id]}</a></li>
        {/each}
      </ol>
    </li>
    <li class="pl-1"><p>ID クリア後に<strong>アルダシール</strong>と話す。</p></li>
  {/each}
</ol>

{:else if stepIndex === 2}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>レヴナンツトール</strong>の<strong>クリスティアナ</strong>（X:21.3 Y:5.4）から下記アイテムを 1 つずつ入手する。</p>
    <table class="text-sm border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-center font-semibold">個数</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">交換レート</th>
        </tr>
      </thead>
      <tbody>
        {#each awItems.materials as m}
          <tr class="bg-white/5">
            <td class="border border-gs-border px-2 py-1 font-semibold" colspan="3"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(m.resultItemId)} alt=""><a class="eorzeadb_link" href={itemUrl(m.resultItemId)} target="_blank" rel="noopener">{m.resultName}</a></td>
          </tr>
          <tr>
            <td class="border border-gs-border px-2 py-1 pl-6"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(m.mysteryItemId)} alt=""><a class="eorzeadb_link" href={itemUrl(m.mysteryItemId)} target="_blank" rel="noopener">{m.mysteryName}</a></td>
            <td class="border border-gs-border px-2 py-1 text-center">×10</td>
            <td class="border border-gs-border px-2 py-1">
              <ul class="space-y-0.5">
                <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(m.tribeItemId)} alt="">{m.tribeCurrencyName} ×3</li>
                {#each awItems.mysteryCommonExchanges as ex}
                  <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(ex.itemId)} alt="">{ex.name} ×{ex.amount}</li>
                {/each}
              </ul>
            </td>
          </tr>
          <tr>
            <td class="border border-gs-border px-2 py-1 pl-6"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(m.subItemId)} alt=""><a class="eorzeadb_link" href={itemUrl(m.subItemId)} target="_blank" rel="noopener">{m.subName}</a></td>
            <td class="border border-gs-border px-2 py-1 text-center">×4</td>
            <td class="border border-gs-border px-2 py-1"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(20)} alt="">各国軍票 ×5,000</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </li>
  <li class="pl-1 space-y-1">
    <p>入手したアイテムを<strong>アジス・ラー</strong>の<strong>ゲロルト</strong>に渡す。</p>
  </li>
</ol>

{:else if stepIndex === 3}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(q0?.usedItems?.[0])} alt=""><a class="eorzeadb_link" href={itemUrl(q0?.usedItems?.[0])} target="_blank" rel="noopener">{partial(q0?.usedItems?.[0], "item")}</a>を 5 つ<strong>ゲロルト</strong>に渡す。</p>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(q0?.usedItems?.[0])} alt=""><strong>アラグの絶霊油</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 350 個で購入できます。</p>
  </li>
</ol>

{:else if stepIndex === 4}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(15841)} alt=""><a class="eorzeadb_link" href={itemUrl(15841)} target="_blank" rel="noopener">{ITEM_NAMES[15841]}</a> 1 つと、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(15840)} alt=""><a class="eorzeadb_link" href={itemUrl(15840)} target="_blank" rel="noopener">{ITEM_NAMES[15840]}</a> 1 つを<strong>イディルシャイア</strong>の<strong>ウラン</strong>に渡し、調整クリスタルサンド 3 つ入手する。</p>
    <p class="text-xs text-gs-muted mt-1">※ <strong>硬霊性岩</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 75 個で購入できます。</p>
    <p class="text-xs text-gs-muted mt-1">※ <strong>クリスタルサンド</strong>は<strong>イディルシャイア</strong>の<strong>ウラン</strong>で下記のいずれかと交換できます（各組み合わせで ×2）。</p>
    <table class="text-xs border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">種別</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-center font-semibold">個数</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">交換方法</th>
        </tr>
      </thead>
      <tbody>
        {#each awItems.crystalSandExchanges as group, gi}
          {#each group.items as item, ii}
            <tr class:gs-sep={gi > 0 && ii === 0}>
              {#if ii === 0}
                <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle" rowspan={group.items.length}>{group.category}</td>
              {/if}
              <td class="border border-gs-border px-2 py-1"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.iconId)} alt="">{item.name}</td>
              <td class="border border-gs-border px-2 py-1 text-center whitespace-nowrap">×{item.qty}</td>
              <td class="border border-gs-border px-2 py-1">
                {#if typeof item.how === "string"}
                  {item.how}
                {:else}
                  <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.how.iconId)} alt="">{item.how.label}
                {/if}
              </td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </li>
  <li class="pl-1 space-y-1">
    <p>調整クリスタルサンド 180 個使用してサブステータスを振り分ける。</p>
  </li>
</ol>

{:else if stepIndex === 5}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>イディルシャイア</strong>の<strong>ブランプレ</strong>に<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(16064)} alt=""><a class="eorzeadb_link" href={itemUrl(16064)} target="_blank" rel="noopener">{ITEM_NAMES[16064]}</a> 50 個渡す。</p>
    <p class="text-xs text-gs-muted mt-1">※ <strong>活性化クラスター</strong>は<strong>イディルシャイア</strong>の<strong>バータナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 40 個で購入できます。</p>
    <p><strong>アルダシール</strong>に話しかける。</p>
  </li>
</ol>

{:else if stepIndex === 6}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記 ID を順番にクリアする。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each sd?.instanceIds ?? [] as id}
        <li><a class="eorzeadb_link" href={instanceUrl(id)} target="_blank" rel="noopener">{INSTANCE_NAMES[id]}</a></li>
      {/each}
    </ol>
  </li>
  <li class="pl-1 space-y-1">
    <p>{@html prevItemLinks}を装備して、魂の凝縮度を高める。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アジス・ラー</strong>の<strong>加工システム</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(16933)} alt=""><a class="eorzeadb_link" href={itemUrl(16933)} target="_blank" rel="noopener">{ITEM_NAMES[16933]}</a>を 15 個集め、<strong>加工システム</strong>に渡し、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(16932)} alt=""><a class="eorzeadb_link" href={itemUrl(16932)} target="_blank" rel="noopener">{ITEM_NAMES[16932]}</a>を入手する。</p>
    <p class="text-xs text-gs-muted mt-1">※ <strong>謎めいた結晶</strong>は<strong>イディルシャイア</strong>の<strong>バータナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 100 個で購入できます。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>アルダシール</strong>に<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(16932)} alt=""><a class="eorzeadb_link" href={itemUrl(16932)} target="_blank" rel="noopener">{ITEM_NAMES[16932]}</a>を渡す。</p>
  </li>
</ol>

{:else if stepIndex === 7}
<ol class="list-decimal space-y-2 pl-5">
  <li class="space-y-1 gs-first-only">
    <p>1 本目作成時のみ、{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注してクリアする。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>アルダシール</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
    <p>※2 本目以降は直接<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>{@html prevItemLinks}を装備して、下記討伐・討滅戦を順番にクリアする。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each sd?.instanceIds ?? [] as id}
        <li><a class="eorzeadb_link" href={instanceUrl(id)} target="_blank" rel="noopener">{INSTANCE_NAMES[id]}</a></li>
      {/each}
    </ol>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(16934)} alt=""><a class="eorzeadb_link" href={itemUrl(16934)} target="_blank" rel="noopener">{ITEM_NAMES[16934]}</a> 1 つを<strong>アルダシール</strong>に渡す。</p>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(16934)} alt=""><strong>古式エンチャントインク</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 500 個で購入できます。</p>
  </li>
</ol>
{/if}

<style>
  .gs-sep td {
    border-top-width: 2px;
  }
</style>
