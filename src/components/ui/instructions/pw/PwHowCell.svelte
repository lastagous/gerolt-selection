<script>
  import { iconUrl, itemUrl } from "../_helpers.js";
  export let how;
  export let currencies = null;

  const GIL_ICON = iconUrl(65002);

  $: tomeData = how.type === "tome_exchange"
    ? (how.tomeRole && currencies
        ? currencies.tomestones[how.tomeRole]
        : { iconId: how.tomeIconId, itemId: how.tomeItemId, name: how.tomeName })
    : null;
</script>

{#if how.type === "text"}
  {how.value}
{:else if how.type === "fate_ce"}
  {how.zones.join(" または ")} の FATE / CE
{:else if how.type === "tome_exchange"}
  {how.location} NPC「{how.npc}」に
  {#if tomeData}
    <img class="inline-block w-4 h-4 object-contain align-middle mx-0.5" src={iconUrl(tomeData.iconId)} alt="" />
    <strong>{tomeData.name} ×{how.tomeQty}個</strong>
  {/if}
  を渡して交換
{:else if how.type === "gil_purchase"}
  {how.location}「{how.npc}」から
  <img class="inline-block w-4 h-4 object-contain align-middle mx-0.5" src={GIL_ICON} alt="" />
  <strong>{how.amount.toLocaleString()} ギル</strong> で購入
{:else if how.type === "bicolor_exchange"}
  {how.location}「{how.npc}」から
  <img class="inline-block w-4 h-4 object-contain align-middle mx-0.5" src={iconUrl(how.bicolorIconId)} alt="" />
  <strong>バイカラージェム ×{how.qty}個</strong>
  で交換{#if how.alsoMarket}、またはマーケット{/if}
{:else if how.type === "craft_or_market"}
  クラフター（{how.crafters.join("・")}）製作 または マーケット（{how.recipe}レシピ）
{:else if how.type === "roulette"}
  コンテンツルーレット：{how.name}
{/if}
