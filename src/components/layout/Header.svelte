<script lang="ts">
  import { LOGOS, type LogoDef } from "../../data/logos";

  const logos: LogoDef[] = LOGOS;
  const logo: LogoDef = logos[Math.floor(Math.random() * logos.length)];

  let sidebarOpen = false;

  const images = ["war", "sch", "mnk", "blm"];
</script>

<!-- ヘッダーバー -->
<header class="gs-header">
  <div class="gs-header-inner">
    <button
      class="gs-btn p-1.5 mr-3"
      aria-label="メニューを開く"
      on:click={() => (sidebarOpen = true)}
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <img src={logo.filePath} alt="ゲロルトの工匠記録" class="h-10 object-contain" />
  </div>
</header>

<!-- サイドバー オーバーレイ -->
{#if sidebarOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 bg-black/60 z-40"
    on:click={() => (sidebarOpen = false)}
  ></div>

  <aside class="fixed right-0 top-0 h-full w-72 bg-gs-panel border-l border-gs-border z-50 flex flex-col">
    <!-- サイドバーヘッダー -->
    <div class="flex items-center p-4 border-b border-gs-border gap-3">
      <img src={logo.filePath} alt="ゲロルトの工匠記録" class="h-10 object-contain" />
      {#if logo.creatorName}
        <div class="text-sm text-gs-muted">
          <p class="mb-0">by:</p>
          {#if logo.link}
            <a href={logo.link} target="_blank" rel="noopener" class="text-gs-gold hover:underline">
              {logo.creatorName}
            </a>
          {:else}
            <span>{logo.creatorName}</span>
          {/if}
        </div>
      {/if}
    </div>

    <!-- サイドバーコンテンツ -->
    <div class="flex-1 p-4 text-sm space-y-2 overflow-y-auto">
      <p>Website: <a href="https://twitter.com/lastagous" target="_blank" rel="noopener" class="text-gs-gold hover:underline">らすと</a></p>
      <p>Illust: <a href="https://twitter.com/toto_lucas_ff14" target="_blank" rel="noopener" class="text-gs-gold hover:underline">ろにゃ</a></p>
      <p class="text-gs-muted mt-2">Logos:</p>
      {#each logos as l}
        {#if l.creatorName}
          <p class="pl-4">
            {#if l.link}
              <a href={l.link} target="_blank" rel="noopener" class="text-gs-gold hover:underline">{l.creatorName}</a>
            {:else}
              <span>{l.creatorName}</span>
            {/if}
          </p>
        {/if}
      {/each}
    </div>

    <!-- サイドバーフッター -->
    <div class="p-4 border-t border-gs-border">
      <div class="flex justify-evenly mb-3">
        {#each images as img}
          <img src={`/img/${img}.png`} alt="" class="w-14 object-contain" />
        {/each}
      </div>
      <div class="flex justify-center gap-4 mb-3">
        <a href="https://twitter.com/lastagous" target="_blank" rel="noopener" class="relative block p-2 hover:opacity-80">
          <img src="/link/x.png" alt="X(Twitter)" class="h-6" />
        </a>
        <a href="https://note.com/lastagous" target="_blank" rel="noopener" class="relative block p-2 hover:opacity-80">
          <img src="/link/note.png" alt="note" class="h-6" />
        </a>
        <a href="https://github.com/lastagous/gerolt-selection" target="_blank" rel="noopener" class="relative block p-2 hover:opacity-80">
          <img src="/link/github.png" alt="GitHub" class="h-6" />
        </a>
      </div>
      <p class="text-xs text-gs-muted text-right">© SQUARE ENIX</p>
    </div>
  </aside>
{/if}

<style>
  .gs-header {
    @apply w-full h-12 flex items-center px-4 border-b border-gs-border bg-gs-panel;
  }

  .gs-header-inner {
    @apply flex items-center h-full;
  }
</style>
