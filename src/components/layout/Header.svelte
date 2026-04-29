<script>
  import { onMount } from "svelte";
  import { WEAPONS, selectedWeapon, selectedJob } from "../../stores/selection.js";
  import { selectedCharacter } from "../../stores/character.js";
  import { weaponMetas, loadAllWeaponMetas, getJobRate } from "../../stores/progress.js";
  import ChangelogDialog from "../ui/ChangelogDialog.svelte";
  import { base } from "../../lib/base.js";
  onMount(() => loadAllWeaponMetas());

  let changelogOpen = false;

  const LATEST_DATE = "2026.04.29";

  const LOGOS = [
    { filePath: `${base}/logo/title/Fwt0U7IaQAMkANo.png`,              creatorName: "らすと",           link: "https://twitter.com/lastagous" },
    { filePath: `${base}/logo/title/FwuUS9LacAEVOKe.png`,              creatorName: "",                 link: "" },
    { filePath: `${base}/logo/title/Fwud8LBaYAA5fnu.png`,              creatorName: "しろっぽいおり",     link: "https://twitter.com/shiroi_nanka" },
    { filePath: `${base}/logo/title/IMG_1713.png`,                     creatorName: "ろにゃ",             link: "https://twitter.com/toto_lucas_ff14" },
    { filePath: `${base}/logo/title/8793ca0a5f8347cd.png`,             creatorName: "P",                link: "" },
    { filePath: `${base}/logo/title/Fwu05qPacAAY_bC.jpg`,             creatorName: "あきち",             link: "https://twitter.com/CafeFreebird" },
    { filePath: `${base}/logo/title/Gerolts-Artisan-Record_01.png`,   creatorName: "EGY-BBBBB",         link: "https://lit.link/egybbbbb" },
    { filePath: `${base}/logo/title/FwzgthhagAAPLlD.png`,             creatorName: "せんや",             link: "https://twitter.com/seNya_yuki" },
  ];

  const logo = LOGOS[Math.floor(Math.random() * LOGOS.length)];
</script>

<header class="gs-header">
  <div class="gs-header-inner">
    <!-- 左: ロゴ（ホバーでクレジット表示） -->
    <div class="relative group flex-shrink-0 mr-3">
      <img src={logo.filePath} alt="ゲロルトの工匠記録" class="h-8 object-contain cursor-default" />
      <div class="logo-tooltip absolute left-0 top-full mt-2 z-50 gs-panel shadow-xl p-3 min-w-max hidden group-hover:block">
        {#if logo.creatorName}
          <p class="text-xs text-gs-muted mb-1">このロゴのクリエイター</p>
          {#if logo.link}
            <a href={logo.link} target="_blank" rel="noopener" class="text-sm text-gs-gold hover:underline">{logo.creatorName}</a>
          {:else}
            <span class="text-sm">{logo.creatorName}</span>
          {/if}
          <hr class="border-gs-border my-2" />
        {/if}
        <p class="text-xs text-gs-muted mb-1.5">ロゴ提供</p>
        <div class="space-y-1">
          {#each LOGOS as l}
            {#if l.creatorName}
              <p class="text-xs">
                {#if l.link}
                  <a href={l.link} target="_blank" rel="noopener" class="text-gs-gold hover:underline">{l.creatorName}</a>
                {:else}
                  <span class="text-gs-muted">{l.creatorName}</span>
                {/if}
              </p>
            {/if}
          {/each}
        </div>
      </div>
    </div>

    <!-- 更新履歴ボタン -->
    <button
      class="flex items-center gap-1 px-2 py-1 rounded text-xs text-gs-muted hover:text-gs-text hover:bg-white/5 transition-colors flex-shrink-0"
      on:click={() => changelogOpen = true}
      title="更新履歴"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>{LATEST_DATE}</span>
    </button>

    <!-- 中央: パンくずリスト -->
    {#if $weaponMetas[$selectedWeapon.key] && $selectedJob}
      {@const rate = Math.floor(getJobRate($weaponMetas[$selectedWeapon.key], $selectedJob, $selectedCharacter) * 100)}
      <nav class="hidden sm:flex items-center ml-4 min-w-0 flex-shrink overflow-hidden text-xs">
        <div class="flex items-center gap-1 text-gs-muted flex-shrink-0">
          <img src={`${base}/icon/weapon/${$selectedWeapon.key}.png`} alt={$selectedWeapon.name} class="w-4 h-4 object-contain" />
          <span>{$selectedWeapon.name}</span>
        </div>
        <svg class="w-3 h-3 mx-1.5 flex-shrink-0 text-gs-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
        <div class="flex flex-col flex-shrink-0">
          <div class="flex items-center gap-1 text-gs-text font-medium">
            <img src={`${base}/icon/job/${$selectedJob}.png`} alt={$selectedJob} class="w-4 h-4 object-contain" />
            <span>{$selectedJob}</span>
          </div>
          {#if $selectedCharacter}
            <div class="h-1 rounded-full bg-gs-border overflow-hidden mt-0.5">
              <div
                class="h-full rounded-full {rate >= 100 ? 'bg-gs-green' : 'bg-gs-orange'}"
                style="width:{rate}%"
              ></div>
            </div>
          {/if}
        </div>
      </nav>
    {/if}

    <!-- 右: 武器ナビ (md以上のみ表示) -->
    <nav class="ml-auto hidden md:flex items-center gap-0.5">
      {#each WEAPONS as weapon}
        <button
          class="flex items-center gap-1 px-2 py-1 rounded transition-colors
            {$selectedWeapon.key === weapon.key
              ? 'bg-gs-gold/20 text-gs-gold'
              : 'text-gs-muted hover:text-gs-text hover:bg-white/5'}"
          on:click={() => selectedWeapon.set(weapon)}
          title={weapon.name}
        >
          <img src={`/icon/weapon/${weapon.key}.png`} alt={weapon.name} class="w-6 h-6 object-contain" />
          <span class="hidden sm:block text-xs font-medium">{weapon.key}</span>
        </button>
      {/each}
    </nav>

  </div>
</header>

<ChangelogDialog bind:open={changelogOpen} />

<style>
  .gs-header       { @apply sticky top-0 z-30 w-full h-12 flex items-center px-4 border-b border-gs-border bg-gs-panel; }
  .gs-header-inner { @apply flex items-center h-full w-full; }
  .logo-tooltip    { pointer-events: none; }
</style>
