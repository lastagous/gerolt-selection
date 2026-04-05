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
</script>

{#if stepIndex === 0}
  <p>1 本目作成時のみ、クガネのケイテンから<a class="eorzeadb_link" href={questUrl(69370)} target="_blank" rel="noopener">失われた聖遺物</a>を受注し、セイブ・ザ・クイーンのストーリーを進める。</p>
  <hr class="border-gs-border my-2" />
  <p>1 本目作成時のみ、{jobJa}でガンゴッシュのゲロルトから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <p>※2 本目以降は代わりに、{jobJa}でガンゴッシュのズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[1]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[1]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>1 本目作成時のみ、<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を進めることで{step.items?.map(item => item.Name_ja).join("と")}を入手できます。</p>
  <p>※2 本目以降は、<a class="eorzeadb_link" href={itemUrl(step.quests?.[1]?.quest?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[1]?.quest?.usedItems?.[0], "item", 1)}</a>を 4 つズラタンに渡す。</p>

{:else if stepIndex === 1}
  <p>{jobJa}でズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>下記アイテムをズラタンに渡す。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    {#each step.quests?.[0]?.quest?.usedItems ?? [] as id}
      <li><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 20 個</li>
    {/each}
  </ol>

{:else if stepIndex === 2}
  <p>{jobJa}でズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>下記アイテムをズラタンに渡す。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    {#each step.quests?.[0]?.quest?.usedItems ?? [] as id}
      <li><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 6 個</li>
    {/each}
  </ol>

{:else if stepIndex === 3}
  <p>カストルム・ラクスリトレ攻城戦とグンヒルド・ディルーブラムをクリアする。</p>
  <hr class="border-gs-border my-2" />
  <p>{jobJa}でズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>下記アイテムをズラタンに渡す。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    {#each step.quests?.[0]?.quest?.usedItems ?? [] as id}
      <li><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 15 個</li>
    {/each}
  </ol>

{:else if stepIndex === 4}
  <p>1 本目作成時のみ、<a class="eorzeadb_link" href={questUrl(69575)} target="_blank" rel="noopener">窮状を救いし、球状の物体</a>をゲロルトから受注する。</p>
  <p>※2 本目以降は、{jobJa}でズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(32957)} target="_blank" rel="noopener">禍々しき記憶の一塊</a> 18 個と<a class="eorzeadb_link" href={itemUrl(32958)} target="_blank" rel="noopener">忌々しき記憶の一塊</a>を追憶システムに渡す。</p>
  <hr class="border-gs-border my-2" />
  <p>{jobJa}でズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>下記アイテムを追憶システムに渡す。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    {#each step.quests?.[0]?.quest?.usedItems ?? [] as id}
      <li><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 15 個</li>
    {/each}
  </ol>

{:else if stepIndex === 5}
  <p>1 本目作成時のみ、ザトゥノル高原のクエストを進め、<a class="eorzeadb_link" href={questUrl(69632)} target="_blank" rel="noopener">古代ボズヤが思い描きし姿</a>まで完了させておく。</p>
  <hr class="border-gs-border my-2" />
  <p>1 本目作成時のみ、下記クエストをズラタンから受注する。</p>
  <ul class="list-disc list-inside space-y-1">
    <li><a class="eorzeadb_link" href={questUrl(69633)} target="_blank" rel="noopener">「霊薬」の特別取引</a></li>
    <li><a class="eorzeadb_link" href={questUrl(69634)} target="_blank" rel="noopener">「特殊合金」の特別取引</a></li>
    <li><a class="eorzeadb_link" href={questUrl(69635)} target="_blank" rel="noopener">「術式」の特別取引</a></li>
  </ul>
  <hr class="border-gs-border my-2" />
  <p>{jobJa}でズラタンから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>下記アイテムをズラタンに渡す。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    {#each step.quests?.[0]?.quest?.usedItems ?? [] as id}
      <li><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a>を 15 個</li>
    {/each}
  </ol>
{/if}
