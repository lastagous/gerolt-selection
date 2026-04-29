<script context="module">
  import { base } from "../../../lib/base.js";
  let _cache = null;
  let _loadPromise = null;

  function getRwData() {
    if (_cache) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = Promise.all([
        fetch(`${base}/data/rw/steps.json`).then(r => r.json()),
        fetch(`${base}/data/rw/quests.json`).then(r => r.json()),
      ]).then(([steps, quests]) => {
        _cache = { steps, quests };
        return _cache;
      });
    }
    return _loadPromise;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { ITEM_ICONS, makeHelpers, iconUrl, questUrl, itemUrl } from "./_helpers.js";
  import { loadCurrencies } from "../../../stores/currencies.js";

  export let step;
  export let stepIndex;

  $: ({ partial, itemIconUrl, questIconUrl } = makeHelpers(step));
  $: jobJa = step.jobNameJa ?? "";

  function iIcon(id) { return ITEM_ICONS[id] ? iconUrl(ITEM_ICONS[id]) : ""; }

  let rwStepsData = [];
  let rwQuests = {};
  let currencies = null;
  let loaded = false;

  onMount(async () => {
    const [d, cur] = await Promise.all([getRwData(), loadCurrencies()]);
    rwStepsData = d.steps;
    rwQuests = d.quests;
    currencies = cur;
    loaded = true;
  });

  $: sd = rwStepsData[stepIndex] ?? null;

  function qIcon(id) { return rwQuests[id] ? iconUrl(rwQuests[id].iconId) : ""; }
  function qName(id) { return rwQuests[id]?.name ?? `クエスト #${id}`; }
</script>

{#if !loaded}
<div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
{:else if stepIndex === 0}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><strong>クガネ</strong>の<strong>ケイテン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注し、セイブ・ザ・クイーンのストーリーを進める。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>ガンゴッシュ</strong>の<strong>ゲロルト</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    <p>※2 本目以降は代わりに、{jobJa}で<strong>ガンゴッシュ</strong>の<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[1]?.id, step.quests?.[1]?.eventIcon ?? step.quests?.[1]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[1]?.id)} target="_blank" rel="noopener">{step.quests?.[1]?.name}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を進めることで{step.items?.map(item => item.nameJa).join("と")}を入手できます。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    <p>※2 本目以降は、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(step.quests?.[1]?.usedItems?.[0])} alt=""><a class="eorzeadb_link" href={itemUrl(step.quests?.[1]?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[1]?.usedItems?.[0], "item", 1)}</a>を 4 つ<strong>ズラタン</strong>に渡す。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(30273)} alt=""><strong>サベネアの霊鱗粉</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 250 個で購入できます。</p>
  </li>
</ol>

{:else if stepIndex === 1}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記アイテムを<strong>ズラタン</strong>に渡す。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each step.quests?.[0]?.usedItems ?? [] as id}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(id)} alt=""><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 20 個</li>
      {/each}
    </ol>
    <table class="text-xs border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
        </tr>
      </thead>
      <tbody>
        {#if sd?.tableItems}
          {#each sd.tableItems as item, i}
            {#each item.sources as src, j}
              <tr class:gs-sep={i > 0 && j === 0}>
                {#if j === 0}
                  <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle" rowspan={item.sources.length}><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.iconId)} alt="">{item.name}</td>
                {/if}
                <td class="border border-gs-border px-2 py-1">{src}</td>
              </tr>
            {/each}
          {/each}
        {/if}
      </tbody>
    </table>
  </li>
</ol>

{:else if stepIndex === 2}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記アイテムを<strong>ズラタン</strong>に渡す。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each step.quests?.[0]?.usedItems ?? [] as id}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(id)} alt=""><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 6 個</li>
      {/each}
    </ol>
    <table class="text-xs border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
        </tr>
      </thead>
      <tbody>
        {#if sd?.tableItems}
          {#each sd.tableItems as item, i}
            {#each item.sources as src, j}
              <tr class:gs-sep={i > 0 && j === 0}>
                {#if j === 0}
                  <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle" rowspan={item.sources.length}><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.iconId)} alt="">{item.name}</td>
                {/if}
                <td class="border border-gs-border px-2 py-1">{src}</td>
              </tr>
            {/each}
          {/each}
        {/if}
      </tbody>
    </table>
  </li>
</ol>

{:else if stepIndex === 3}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>カストルム・ラクスリトレ攻城戦とグンヒルド・ディルーブラムをクリアする。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記アイテムを<strong>ズラタン</strong>に渡す。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each step.quests?.[0]?.usedItems ?? [] as id}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(id)} alt=""><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 15 個</li>
      {/each}
    </ol>
    <table class="text-xs border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
        </tr>
      </thead>
      <tbody>
        {#if sd?.tableItems}
          {#each sd.tableItems as item, i}
            {#each item.sources as src, j}
              <tr class:gs-sep={i > 0 && j === 0}>
                {#if j === 0}
                  <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle" rowspan={item.sources.length}><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.iconId)} alt="">{item.name}</td>
                {/if}
                <td class="border border-gs-border px-2 py-1">{src}</td>
              </tr>
            {/each}
          {/each}
        {/if}
      </tbody>
    </table>
  </li>
</ol>

{:else if stepIndex === 4}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を<strong>ゲロルト</strong>から受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    <p>※2 本目以降は、{jobJa}で<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    {#if sd?.tableItems?.[0] && sd?.tableItems?.[1]}
      <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(sd.tableItems[0].iconId)} alt=""><a class="eorzeadb_link" href={itemUrl(sd.tableItems[0].itemId)} target="_blank" rel="noopener">{sd.tableItems[0].name}</a> {sd.tableItems[0].qty} 個と<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(sd.tableItems[1].iconId)} alt=""><a class="eorzeadb_link" href={itemUrl(sd.tableItems[1].itemId)} target="_blank" rel="noopener">{sd.tableItems[1].name}</a> {sd.tableItems[1].qty} 個を<strong>追憶システム</strong>に渡す。</p>
    {/if}
    <table class="text-xs border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
        </tr>
      </thead>
      <tbody>
        {#if sd?.tableItems}
          {#each sd.tableItems as item, i}
            {#each item.sources as src, j}
              <tr class:gs-sep={i > 0 && j === 0}>
                {#if j === 0}
                  <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle" rowspan={item.sources.length}><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.iconId)} alt="">{item.name}</td>
                {/if}
                <td class="border border-gs-border px-2 py-1">{src}</td>
              </tr>
            {/each}
          {/each}
        {/if}
      </tbody>
    </table>
  </li>
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記アイテムを<strong>追憶システム</strong>に渡す。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each step.quests?.[0]?.usedItems ?? [] as id}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(id)} alt=""><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 15 個</li>
      {/each}
    </ol>
    <p class="text-xs text-gs-muted mt-1">※ 上記アイテムは<strong>グンヒルド・ディルーブラム</strong>または地下迷宮：<strong>死者の宮殿</strong>で入手できます。</p>
  </li>
</ol>

{:else if stepIndex === 5}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><strong>ザトゥノル高原</strong>のクエストを進め、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimePrereqQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimePrereqQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimePrereqQuestId)}</a>まで完了させておく。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記クエストを<strong>ズラタン</strong>から受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    <ul class="list-disc list-inside space-y-1">
      {#each sd?.subQuestIds ?? [] as qid}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(qid)} alt=""><a class="eorzeadb_link" href={questUrl(qid)} target="_blank" rel="noopener">{qName(qid)}</a></li>
      {/each}
    </ul>
  </li>
  <li class="pl-1 space-y-1">
    <p>{jobJa}で<strong>ズラタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(step.quests?.[0]?.id, step.quests?.[0]?.eventIcon ?? step.quests?.[0]?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記アイテムを<strong>ズラタン</strong>に渡す。</p>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      {#each step.quests?.[0]?.usedItems ?? [] as id}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(id)} alt=""><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 15 個</li>
      {/each}
    </ol>
    <table class="text-xs border-collapse border border-gs-border mt-1 w-full">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
        </tr>
      </thead>
      <tbody>
        {#if sd?.tableItems}
          {#each sd.tableItems as item, i}
            {#each item.sources as src, j}
              <tr class:gs-sep={i > 0 && j === 0}>
                {#if j === 0}
                  <td class="border border-gs-border px-2 py-1 whitespace-nowrap align-middle" rowspan={item.sources.length}><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(item.iconId)} alt="">{item.name}</td>
                {/if}
                <td class="border border-gs-border px-2 py-1">{src}</td>
              </tr>
            {/each}
          {/each}
        {/if}
      </tbody>
    </table>
  </li>
</ol>
{/if}

<style>
  .gs-sep td {
    border-top-width: 2px;
  }
</style>
