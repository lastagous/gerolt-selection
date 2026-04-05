<script lang="ts">
  import type { Relation } from "../../../stores/progress";
  import { ITEM_NAMES } from "../../../data/lookup";

  export let step: Relation;
  export let stepIndex: number;
  export let steps: Relation[];
  export let tooltips: any[] = [];

  const LODESTONE_BASE = "https://jp.finalfantasyxiv.com/lodestone/playguide/db/";
  function tooltipUrl(id: number, type: string): string {
    const t = tooltips.find((x: any) => x.id === id && x.urlType === type);
    return `${LODESTONE_BASE}${type}/${t ? t.tooltipId + "/" : ""}`;
  }
  function itemUrl(id: number) { return tooltipUrl(id, "item"); }

  const prevItems = stepIndex > 0 ? (steps[stepIndex - 1]?.items ?? []) : [];
  const prevItemLinks = prevItems.map(item =>
    `<a class="eorzeadb_link" href="${itemUrl(item.ID)}" target="_blank" rel="noopener">${item.Name_ja}</a>`
  ).join("と");
</script>

{#if stepIndex === 0}
  <p>ジョブクエストの報酬装備と<a class="eorzeadb_link" href={itemUrl(21801)} target="_blank" rel="noopener">{ITEM_NAMES[21801]}</a> 100 個をアネモス編のゲロルトに渡す。</p>
{:else if stepIndex === 1}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(21801)} target="_blank" rel="noopener">{ITEM_NAMES[21801]}</a> 400 個をアネモス編のゲロルトに渡す。</p>
{:else if stepIndex === 2}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(21801)} target="_blank" rel="noopener">{ITEM_NAMES[21801]}</a> 800 個をアネモス編のゲロルトに渡す。</p>
{:else if stepIndex === 3}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(21802)} target="_blank" rel="noopener">{ITEM_NAMES[21802]}</a> 3 個をアネモス編のゲロルトに渡す。</p>
{:else if stepIndex === 4}
  <p>EL (エレメンタルレベル) を25に上げ、クルルからのクエストを受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(23309)} target="_blank" rel="noopener">{ITEM_NAMES[23309]}</a> 5 個をパゴス編のゲロルトに渡す。</p>
{:else if stepIndex === 5}
  <p>{@html prevItemLinks}<a class="eorzeadb_link" href={itemUrl(23309)} target="_blank" rel="noopener">{ITEM_NAMES[23309]}</a> 10 個と<a class="eorzeadb_link" href={itemUrl(22976)} target="_blank" rel="noopener">{ITEM_NAMES[22976]}</a> 500 個をパゴス編のゲロルトに渡す。</p>
{:else if stepIndex === 6}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(23309)} target="_blank" rel="noopener">{ITEM_NAMES[23309]}</a> 16 個と<a class="eorzeadb_link" href={itemUrl(22975)} target="_blank" rel="noopener">{ITEM_NAMES[22975]}</a> 5 個をパゴス編のゲロルトに渡す。</p>
{:else if stepIndex === 7}
  <p>ロゴスアクションを 10 種類開放する。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24124)} target="_blank" rel="noopener">{ITEM_NAMES[24124]}</a> 150 個をピューロス編のゲロルトに渡す。</p>
{:else if stepIndex === 8}
  <p>ロゴスアクションを 20 種類開放する。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24124)} target="_blank" rel="noopener">{ITEM_NAMES[24124]}</a> 200 個をピューロス編のゲロルトに渡す。</p>
{:else if stepIndex === 9}
  <p>ロゴスアクションを 30 種類開放する。</p>
  <hr class="border-gs-border my-2" />
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24124)} target="_blank" rel="noopener">{ITEM_NAMES[24124]}</a> 300 個と<a class="eorzeadb_link" href={itemUrl(24123)} target="_blank" rel="noopener">{ITEM_NAMES[24123]}</a> 5 個をピューロス編のゲロルトに渡す。</p>
{:else if stepIndex === 10}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24807)} target="_blank" rel="noopener">{ITEM_NAMES[24807]}</a> 50 個をヒュダトス編のゲロルトに渡す。</p>
{:else if stepIndex === 11}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24807)} target="_blank" rel="noopener">{ITEM_NAMES[24807]}</a> 100 個をヒュダトス編のゲロルトに渡す。</p>
{:else if stepIndex === 12}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24807)} target="_blank" rel="noopener">{ITEM_NAMES[24807]}</a> 100 個をヒュダトス編のゲロルトに渡す。</p>
{:else if stepIndex === 13}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24807)} target="_blank" rel="noopener">{ITEM_NAMES[24807]}</a> 100 個と<a class="eorzeadb_link" href={itemUrl(24806)} target="_blank" rel="noopener">{ITEM_NAMES[24806]}</a> 5 個をヒュダトス編のゲロルトに渡す。</p>
{:else if stepIndex === 14}
  <p>{@html prevItemLinks}と<a class="eorzeadb_link" href={itemUrl(24808)} target="_blank" rel="noopener">{ITEM_NAMES[24808]}</a> 100 個をヒュダトス編のゲロルトに渡す。</p>
{/if}
