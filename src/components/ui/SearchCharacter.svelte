<script lang="ts">
  import { isFetching, fetchError, fetchCharacter } from "../../stores/character";

  let searchString = "";
  let inputError = false;

  const LODESTONE_RE = /finalfantasyxiv\.com\/lodestone\/character\/([^/]+)\/?/;

  async function onSearch() {
    const match = searchString.match(LODESTONE_RE);
    if (!match) {
      inputError = true;
      return;
    }
    inputError = false;
    searchString = "";
    await fetchCharacter(match[1]);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") onSearch();
  }
</script>

<div class="gs-panel p-3 space-y-2">
  <!-- 案内 -->
  <div class="flex items-start gap-2 text-xs text-gs-muted">
    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 flex-shrink-0">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
      Info
    </span>
    <span>
      <a href="https://ffxivcollect.com/" target="_blank" rel="noopener" class="text-gs-gold hover:underline">FFXIV Collect</a>
      で Select Character をしてから Search を実行してください！
    </span>
  </div>

  <!-- 入力 -->
  <div class="flex gap-2">
    <input
      type="text"
      bind:value={searchString}
      disabled={$isFetching}
      placeholder="https://jp.finalfantasyxiv.com/lodestone/character/00000000"
      class="gs-input flex-1 {inputError ? 'gs-input-error' : ''}"
      on:keydown={onKeydown}
    />
    <button
      class="gs-btn-primary flex-shrink-0"
      disabled={$isFetching}
      on:click={onSearch}
    >
      {#if $isFetching}
        <svg class="w-4 h-4 animate-spin mr-1" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      {:else}
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      {/if}
      Search
    </button>
  </div>

  {#if $fetchError}
    <p class="text-xs text-red-400">{$fetchError}</p>
  {/if}
</div>
