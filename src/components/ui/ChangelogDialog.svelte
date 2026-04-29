<script>
  export let open = false;

  function close() { open = false; }
  function handleKeydown(e) { if (e.key === "Escape") close(); }

  const CHANGELOG = [
    {
      date: "2026.04.29",
      entries: [
        "Astro / Svelte への移行完了（UI全面リニューアル）",
        "ファントム武器（PW）に対応",
        "トームストーン・スクリップのアイコン/名称を動的取得に変更",
        "各武器ページに読み込み中表示を追加",
      ],
    },
    {
      date: "2026.04.06",
      entries: [
        "各武器の作成手順テキストを復元",
      ],
    },
    {
      date: "2024.01.20",
      entries: [
        "Lodestone スクレイプ API を XIVCollect へ移行",
      ],
    },
    {
      date: "2024.01.18",
      entries: [
        "マンダヴィル武器 第4段階の情報を追加",
      ],
    },
    {
      date: "2023.12.18",
      entries: [
        "ギル交換アイテムの一覧タブを追加",
        "アイテム交換のギル表示を追加",
      ],
    },
  ];

  $: latestDate = CHANGELOG[0]?.date ?? "";
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
    on:click={(e) => e.target === e.currentTarget && close()}
  >
    <div class="gs-panel w-full max-w-md flex flex-col max-h-[calc(100dvh-2rem)]">

      <!-- ヘッダー -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gs-border flex-shrink-0">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gs-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm font-medium">更新履歴</span>
          <span class="text-xs text-gs-muted">最終更新: {latestDate}</span>
        </div>
        <button class="gs-btn p-1" on:click={close} aria-label="閉じる">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- コンテンツ -->
      <div class="overflow-y-auto flex-1 min-h-0 p-4 space-y-5">
        {#each CHANGELOG as log, i}
          <div class="relative pl-4 border-l-2 {i === 0 ? 'border-gs-gold' : 'border-gs-border'}">
            <p class="text-xs font-semibold {i === 0 ? 'text-gs-gold' : 'text-gs-muted'} mb-1.5">{log.date}</p>
            <ul class="space-y-1">
              {#each log.entries as entry}
                <li class="text-sm text-gs-text leading-relaxed before:content-['·'] before:mr-1.5 before:text-gs-muted">{entry}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

    </div>
  </div>
{/if}
