<script context="module">
  import { base } from "../../../lib/base.js";
  let _cache = null;
  let _loadPromise = null;

  function getEwData() {
    if (_cache) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = fetch(`${base}/data/ew/steps.json`).then(r => r.json()).then(steps => {
        _cache = { steps };
        return _cache;
      });
    }
    return _loadPromise;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { makeHelpers, iconUrl, itemUrl } from "./_helpers.js";

  export let step;
  export let stepIndex;
  export let steps;

  $: ({ buildPrevItemLinks } = makeHelpers(step));
  $: prevItemLinks = buildPrevItemLinks(steps, stepIndex);

  let stepsData = [];
  let loaded = false;

  onMount(async () => {
    const d = await getEwData();
    stepsData = d.steps;
    loaded = true;
  });

  $: sd = stepsData[stepIndex] ?? null;
</script>

{#if !loaded}
  <div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
{:else if sd}
  {#if sd.prerequisite}
    <ol class="list-decimal space-y-2 pl-5">
      <li class="pl-1"><p>EL (エレメンタルレベル) を25に上げ、<strong>クルル</strong>からのクエストを受注する。</p></li>
      <li class="pl-1 space-y-1">
        <p>{@html prevItemLinks}と以下のアイテムを{sd.area}の<strong>ゲロルト</strong>に渡す。</p>
        {#each sd.materials as mat}
          <p class="mt-1">
            <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(mat.iconId)} alt="" /><a class="eorzeadb_link" href={itemUrl(mat.itemId)} target="_blank" rel="noopener">{mat.name}</a> {mat.qty} 個
          </p>
          <p class="text-xs text-gs-muted mt-1">※ {mat.note}</p>
        {/each}
      </li>
    </ol>
  {:else if sd.logosCount}
    <ol class="list-decimal space-y-2 pl-5">
      <li class="pl-1"><p>ロゴスアクションを {sd.logosCount} 種類開放する。</p></li>
      <li class="pl-1 space-y-1">
        {#if sd.materials.length === 1}
          <p>{@html prevItemLinks}と<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(sd.materials[0].iconId)} alt="" /><a class="eorzeadb_link" href={itemUrl(sd.materials[0].itemId)} target="_blank" rel="noopener">{sd.materials[0].name}</a> {sd.materials[0].qty} 個を{sd.area}の<strong>ゲロルト</strong>に渡す。</p>
          <p class="text-xs text-gs-muted mt-1">※ {sd.materials[0].note}</p>
        {:else}
          <p>{@html prevItemLinks}と以下のアイテムを{sd.area}の<strong>ゲロルト</strong>に渡す。</p>
          <ul class="text-xs text-gs-muted mt-1 space-y-0.5">
            {#each sd.materials as mat}
              <li>
                <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(mat.iconId)} alt="" /><a class="eorzeadb_link" href={itemUrl(mat.itemId)} target="_blank" rel="noopener">{mat.name}</a> {mat.qty} 個
              </li>
            {/each}
          </ul>
          <ul class="text-xs text-gs-muted mt-1 space-y-0.5">
            {#each sd.materials as mat}
              <li>※ {mat.note}</li>
            {/each}
          </ul>
        {/if}
      </li>
    </ol>
  {:else if sd.materials.length === 1}
    <p>
      {#if stepIndex === 0}ジョブクエストの報酬装備と{:else}{@html prevItemLinks}と{/if}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(sd.materials[0].iconId)} alt="" /><a class="eorzeadb_link" href={itemUrl(sd.materials[0].itemId)} target="_blank" rel="noopener">{sd.materials[0].name}</a> {sd.materials[0].qty} 個を{sd.area}の<strong>ゲロルト</strong>に渡す。
    </p>
    <p class="text-xs text-gs-muted mt-1">※ {sd.materials[0].note}</p>
  {:else}
    <p>{@html prevItemLinks}と以下のアイテムを{sd.area}の<strong>ゲロルト</strong>に渡す。</p>
    <ul class="text-xs text-gs-muted mt-1 space-y-0.5">
      {#each sd.materials as mat}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(mat.iconId)} alt="" /><a class="eorzeadb_link" href={itemUrl(mat.itemId)} target="_blank" rel="noopener">{mat.name}</a> {mat.qty} 個</li>
      {/each}
    </ul>
    <ul class="text-xs text-gs-muted mt-1 space-y-0.5">
      {#each sd.materials as mat}
        <li>※ {mat.note}</li>
      {/each}
    </ul>
  {/if}
{/if}
