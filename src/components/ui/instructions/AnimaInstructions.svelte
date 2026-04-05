<script lang="ts">
  import type { Relation } from "../../../stores/progress";
  import { ITEM_NAMES, INSTANCE_NAMES } from "../../../data/lookup";

  export let step: Relation;
  export let stepIndex: number;
  export let steps: Relation[];
  export let tooltips: any[] = [];

  const LODESTONE_BASE = "https://jp.finalfantasyxiv.com/lodestone/playguide/db/";
  function tooltipUrl(id: number, type: string): string {
    const t = tooltips.find((x: any) => x.id === id && x.urlType === type);
    return `${LODESTONE_BASE}${type}/${t ? t.tooltipId + "/" : ""}`;
  }
  function questUrl(id: number) { return tooltipUrl(id, "quest"); }
  function itemUrl(id: number) { return tooltipUrl(id, "item"); }
  function instanceUrl(id: number) { return tooltipUrl(id, "duty"); }

  function partial(id: number | string, type: string, questIdx = 0): string {
    const p = step.quests?.[questIdx]?.partials?.find(
      (x: any) => String(x.id) === String(id) && x.type === type
    );
    return p?.obj?.n ?? String(id);
  }

  const jobJa = step.classJobCategory?.Name_ja ?? step.classJobCategory?.Name ?? "";
  const prevItems = stepIndex > 0 ? (steps[stepIndex - 1]?.items ?? []) : [];
  const prevItemLinks = prevItems.map(item =>
    `<a class="eorzeadb_link" href="${itemUrl(item.ID)}" target="_blank" rel="noopener">${item.Name_ja}</a>`
  ).join("と");
</script>

{#if stepIndex === 0}
  <p>{jobJa}でアジス・ラーのアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>レヴナンツトールのシンドニーから<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[0], "item")}</a>と<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を入手する。</p>
  <hr class="border-gs-border my-2" />
  <p>アルダシールに<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[0], "item")}</a>と<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を渡す。</p>

{:else if stepIndex === 1}
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}を装備して、下記 ID を順番にクリアする。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li><a class="eorzeadb_link" href={instanceUrl(27)} target="_blank" rel="noopener">{INSTANCE_NAMES[27]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(28)} target="_blank" rel="noopener">{INSTANCE_NAMES[28]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(26)} target="_blank" rel="noopener">{INSTANCE_NAMES[26]}</a></li>
  </ol>
  <p>ID クリア後にアルダシールと話す。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}を装備して、下記 ID を順番にクリアする。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li><a class="eorzeadb_link" href={instanceUrl(32)} target="_blank" rel="noopener">{INSTANCE_NAMES[32]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(30)} target="_blank" rel="noopener">{INSTANCE_NAMES[30]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(29)} target="_blank" rel="noopener">{INSTANCE_NAMES[29]}</a></li>
  </ol>
  <p>ID クリア後にアルダシールと話す。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}を装備して、下記 ID を順番にクリアする。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li><a class="eorzeadb_link" href={instanceUrl(36)} target="_blank" rel="noopener">{INSTANCE_NAMES[36]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(37)} target="_blank" rel="noopener">{INSTANCE_NAMES[37]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(38)} target="_blank" rel="noopener">{INSTANCE_NAMES[38]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(39)} target="_blank" rel="noopener">{INSTANCE_NAMES[39]}</a></li>
  </ol>
  <p>ID クリア後にアルダシールと話す。</p>

{:else if stepIndex === 2}
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>レヴナンツトールのクリスティアナから下記アイテムを 1 つずつ入手する。</p>
  <ul class="list-disc list-inside space-y-1">
    {#each step.quests?.[0]?.quest?.usedItems ?? [] as id}
      <li><a class="eorzeadb_link" href={itemUrl(id)} target="_blank" rel="noopener">{partial(id, "item")}</a></li>
    {/each}
  </ul>
  <hr class="border-gs-border my-2" />
  <p>入手したアイテムをアジス・ラーのゲロルトに渡す。</p>

{:else if stepIndex === 3}
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[0], "item")}</a>を 5 つゲロルトに渡す。</p>

{:else if stepIndex === 4}
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(15841)} target="_blank" rel="noopener">{ITEM_NAMES[15841]}</a> 1 つと、<a class="eorzeadb_link" href={itemUrl(15840)} target="_blank" rel="noopener">{ITEM_NAMES[15840]}</a> 1 つをイディルシャイアのウランに渡し、調整クリスタルサンド 3 つ入手する。</p>
  <hr class="border-gs-border my-2" />
  <p>調整クリスタルサンド 180 個使用してサブステータスを振り分ける。</p>

{:else if stepIndex === 5}
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>イディルシャイアのブランプレに<a class="eorzeadb_link" href={itemUrl(16064)} target="_blank" rel="noopener">{ITEM_NAMES[16064]}</a> 50 個渡す。</p>
  <p>アルダシールに話しかける。</p>

{:else if stepIndex === 6}
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>下記 ID を順番にクリアする。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li><a class="eorzeadb_link" href={instanceUrl(42)} target="_blank" rel="noopener">{INSTANCE_NAMES[42]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(47)} target="_blank" rel="noopener">{INSTANCE_NAMES[47]}</a></li>
    <li><a class="eorzeadb_link" href={instanceUrl(49)} target="_blank" rel="noopener">{INSTANCE_NAMES[49]}</a></li>
  </ol>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}を装備して、魂の凝縮度を高める。</p>
  <hr class="border-gs-border my-2" />
  <p>{jobJa}でアジス・ラーの加工システムから<a class="eorzeadb_link" href={questUrl(67933)} target="_blank" rel="noopener">新生ソウルストーンの創造</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(16933)} target="_blank" rel="noopener">{ITEM_NAMES[16933]}</a>を 15 個集め、加工システムに渡し、<a class="eorzeadb_link" href={itemUrl(16932)} target="_blank" rel="noopener">{ITEM_NAMES[16932]}</a>を入手する。</p>
  <hr class="border-gs-border my-2" />
  <p>アルダシールに<a class="eorzeadb_link" href={itemUrl(16932)} target="_blank" rel="noopener">{ITEM_NAMES[16932]}</a>を渡す。</p>

{:else if stepIndex === 7}
  <p>1 本目作成時のみ、{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(67939)} target="_blank" rel="noopener">新たな報せ</a>を受注してクリアする。</p>
  <p>{jobJa}でアルダシールから<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <p>※2 本目以降は直接<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}を装備して、下記討伐・討滅戦を順番にクリアする。</p>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    {#each [20004,20006,20005,20011,20017,20022,20024,20031,20033,20037,20041,20043] as id}
      <li><a class="eorzeadb_link" href={instanceUrl(id)} target="_blank" rel="noopener">{INSTANCE_NAMES[id]}</a></li>
    {/each}
  </ol>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(16934)} target="_blank" rel="noopener">{ITEM_NAMES[16934]}</a> 1 つをアルダシールに渡す。</p>
{/if}
