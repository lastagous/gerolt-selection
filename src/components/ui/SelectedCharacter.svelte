<script lang="ts">
  import { selectedCharacter, isFetching, fetchCharacter, removeCharacter } from "../../stores/character";
  import { relations, relationsLoaded, loadRelations, getShareText } from "../../stores/progress";
  import { onMount } from "svelte";

  onMount(() => loadRelations());

  function daysSince(timestamp: number): number {
    return Math.floor((Date.now() - timestamp * 1000) / 86400000);
  }

  function isAchievementsPublic(): boolean {
    return $selectedCharacter?.collect.character.achievements.public ?? false;
  }

  async function onRefresh() {
    if (!$selectedCharacter) return;
    await fetchCharacter(String($selectedCharacter.collect.character.id));
  }

  function onRemove() {
    if (!$selectedCharacter) return;
    removeCharacter($selectedCharacter.collect.character.id);
  }

  function onShare() {
    if (!$selectedCharacter || !$relationsLoaded) return;
    const text = getShareText($relations, $selectedCharacter);
    const url = "https://lastagous.com/";
    const hashtags = "FF14,ゲロルトの工匠記録";
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}&hashtags=${hashtags}`,
      "_blank"
    );
  }
</script>

<div class="gs-panel p-3">
  {#if !$selectedCharacter}
    <p class="text-sm text-gs-muted text-center py-2">
      Search ボタンからキャラクターを検索してください！
    </p>
  {:else}
    {@const char = $selectedCharacter}
    <div class="flex items-center gap-3">
      <img
        src={char.collect.character.avatar}
        alt={char.collect.character.name}
        class="w-12 h-12 rounded object-cover flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5 text-sm font-medium truncate">
          {#if !isAchievementsPublic()}
            <svg class="w-3.5 h-3.5 text-gs-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
          {/if}
          <span class="truncate" title={char.collect.character.name}>{char.collect.character.name}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-gs-muted mt-0.5" title="最終更新">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {daysSince(char.updateTimestamp)}日前
        </div>
      </div>
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <button class="gs-btn p-1.5" title="更新" disabled={$isFetching} on:click={onRefresh}>
          <svg class="w-4 h-4 {$isFetching ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
        <button class="gs-btn-danger p-1.5" title="削除" on:click={onRemove}>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
        {#if isAchievementsPublic()}
          <button class="gs-btn text-xs px-2 py-1 gap-1" title="ポストする！" on:click={onShare}>
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25z"/>
            </svg>
            Share
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>
