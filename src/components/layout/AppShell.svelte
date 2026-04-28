<script>
  import RelicProgressList from "../ui/RelicProgressList.svelte";
  import StepDetail from "../ui/StepDetail.svelte";
  import StepToc from "../ui/StepToc.svelte";
  import AchievementDialog from "../ui/AchievementDialog.svelte";
  import { WEAPONS, selectedWeapon } from "../../stores/selection.js";

  let activeTab = "select";
  let achievementOpen = false;
</script>

<AchievementDialog bind:open={achievementOpen} />

<!-- ====== MOBILE (md 未満) ====== -->
<div class="md:hidden">
  <!-- 武器選択バー -->
  <div class="flex items-center justify-around px-2 py-2 border-b border-gs-border">
    {#each WEAPONS as weapon}
      <button
        class="flex items-center gap-1 px-2 py-1.5 rounded transition-colors
          {$selectedWeapon.key === weapon.key
            ? 'bg-gs-gold/20 text-gs-gold'
            : 'text-gs-muted hover:text-gs-text hover:bg-white/5'}"
        on:click={() => selectedWeapon.set(weapon)}
      >
        <img src={`/icon/weapon/${weapon.key}.png`} alt={weapon.name} class="w-6 h-6 object-contain" />
        <span class="text-xs font-medium">{weapon.key}</span>
      </button>
    {/each}
  </div>

  <!-- タブ コンテンツ -->
  <div class="px-3 pt-3 pb-16">
    <div class="{activeTab !== 'select' ? 'hidden' : ''}">
      <RelicProgressList onOpenAchievement={() => (achievementOpen = true)} />
    </div>
    <div class="{activeTab !== 'detail' ? 'hidden' : ''}">
      <StepDetail />
    </div>
    <div class="{activeTab !== 'achievement' ? 'hidden' : ''}">
      <AchievementDialog inline={true} open={true} />
    </div>
  </div>

  <!-- ボトム タブバー -->
  <nav class="fixed bottom-0 left-0 right-0 z-20 flex h-14 border-t border-gs-border bg-gs-panel">
    <button
      class="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors {activeTab === 'select' ? 'text-gs-gold' : 'text-gs-muted'}"
      on:click={() => (activeTab = "select")}
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
      <span>ジョブ</span>
    </button>
    <button
      class="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors {activeTab === 'detail' ? 'text-gs-gold' : 'text-gs-muted'}"
      on:click={() => (activeTab = "detail")}
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>詳細</span>
    </button>
    <button
      class="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors {activeTab === 'achievement' ? 'text-gs-gold' : 'text-gs-muted'}"
      on:click={() => (activeTab = "achievement")}
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
      <span>アチーブメント</span>
    </button>
  </nav>
</div>

<!-- ====== TABLET (md 〜 lg) ====== -->
<div class="hidden md:flex lg:hidden gap-4 px-4 py-4 max-w-screen-xl mx-auto w-full">
  <aside class="w-44 flex-shrink-0">
    <div class="sticky top-16 overflow-y-auto max-h-[calc(100dvh-5rem)] gs-sidebar-scroll">
      <RelicProgressList onOpenAchievement={() => (achievementOpen = true)} />
    </div>
  </aside>
  <div class="flex-1 min-w-0">
    <StepDetail />
  </div>
</div>

<!-- ====== DESKTOP (lg 以上) ====== -->
<div class="hidden lg:flex gap-4 px-4 py-4 max-w-screen-xl mx-auto w-full">
  <aside class="w-44 flex-shrink-0">
    <div class="sticky top-16 overflow-y-auto max-h-[calc(100dvh-5rem)] gs-sidebar-scroll">
      <RelicProgressList onOpenAchievement={() => (achievementOpen = true)} />
    </div>
  </aside>
  <div class="flex-1 min-w-0">
    <StepDetail />
  </div>
  <aside class="w-56 flex-shrink-0">
    <div class="sticky top-16 overflow-y-auto max-h-[calc(100dvh-5rem)] gs-sidebar-scroll">
      <StepToc />
    </div>
  </aside>
</div>
