<script lang="ts">
  import type { Relation } from "../../../stores/progress";

  export let step: Relation;
  export let stepIndex: number;
  export let tooltips: any[] = [];

  const LODESTONE_BASE = "https://jp.finalfantasyxiv.com/lodestone/playguide/db/";
  function tooltipUrl(id: number, type: string): string {
    const t = tooltips.find((x: any) => x.id === id && x.urlType === type);
    return `${LODESTONE_BASE}${type}/${t ? t.tooltipId + "/" : ""}`;
  }
  function questUrl(id: number) { return tooltipUrl(id, "quest"); }
  function itemUrl(id: number) { return tooltipUrl(id, "item"); }

  function partial(id: number | string, type: string, questIdx = 0): string {
    const p = step.quests?.[questIdx]?.partials?.find(
      (x: any) => String(x.id) === String(id) && x.type === type
    );
    return p?.obj?.n ?? String(id);
  }

  const jobJa = step.classJobCategory?.Name_ja ?? step.classJobCategory?.Name ?? "";

  const prerequisites = [
    "帰ってきたヒルディブランドまでクリアする。",
    "はつらつとした親子までクリアする。",
    "のうてんきな一家までクリアする。",
    "マンダヴィル家の謎までクリアする。",
  ];
</script>

{#if stepIndex <= 3}
  <p>ヒルディブランド関連のクエストを進め、{prerequisites[stepIndex]}</p>
  <hr class="border-gs-border my-2" />
  {#if stepIndex === 0}
    <p>{jobJa}でラザハンのマンダヴィル家の使用人から<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  {:else}
    <p>{jobJa}でゲロルトから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  {/if}
  <p>※2 本目以降は、{jobJa}でマンダヴィル家の職人から<a class="eorzeadb_link" href={questUrl(step.quests?.[1]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[1]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[0], "item")}</a> 3 つをラザハンにいるゲロルトに渡す。</p>
{/if}
