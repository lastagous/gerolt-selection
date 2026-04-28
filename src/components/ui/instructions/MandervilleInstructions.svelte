<script context="module">
  let _cache = null;
  let _loadPromise = null;

  function getMwData() {
    if (_cache) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = fetch("/data/mw/steps.json").then(r => r.json()).then(steps => {
        _cache = { steps };
        return _cache;
      });
    }
    return _loadPromise;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { makeHelpers, iconUrl, questUrl, itemUrl } from "./_helpers.js";
  import { loadCurrencies } from "../../../stores/currencies.js";

  export let step;
  export let stepIndex;

  $: ({ partial, itemIconUrl, questIconUrl } = makeHelpers(step));
  $: jobJa = step.jobNameJa ?? "";

  let mwStepsData = [];
  let currencies = null;
  let loaded = false;

  onMount(async () => {
    const [d, cur] = await Promise.all([getMwData(), loadCurrencies()]);
    mwStepsData = d.steps;
    currencies = cur;
    loaded = true;
  });

  $: sd = mwStepsData[stepIndex] ?? null;

  $: q0 = step.quests?.[0];
  $: q1 = step.quests?.[1];
  $: usedItem0 = q0?.usedItems?.[0];
</script>

{#if !loaded}
<div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
{:else if stepIndex <= 3}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>ヒルディブランド関連のクエストを進め、{sd?.prerequisite}<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    {#if stepIndex === 0}
      <p>{jobJa}で<strong>ラザハン</strong>の<strong>マンダヴィル家の使用人</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    {:else}
      <p>{jobJa}で<strong>ゲロルト</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    {/if}
    <p>※2 本目以降は、{jobJa}で<strong>マンダヴィル家の職人</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q1?.id, q1?.eventIcon ?? q1?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q1?.id)} target="_blank" rel="noopener">{q1?.name}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(usedItem0)} alt=""><a class="eorzeadb_link" href={itemUrl(usedItem0)} target="_blank" rel="noopener">{partial(usedItem0, "item")}</a> 3 つを<strong>ラザハン</strong>にいる<strong>ゲロルト</strong>に渡す。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
    <p class="text-xs text-gs-muted mt-1">※ 上記アイテムは<strong>ラザハン</strong>（X:12.2 Y:10.9）の<strong>ジュブルンナ</strong>から{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 500 個で購入できます。</p>
  </li>
</ol>
{/if}
