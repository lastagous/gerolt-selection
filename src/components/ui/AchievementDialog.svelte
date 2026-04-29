<script>
  import { onMount } from "svelte";
  import {
    selectedCharacter, isFetching, fetchError,
    fetchCharacter, removeCharacter,
  } from "../../stores/character.js";
  import {
    weaponMetas, loadAllWeaponMetas,
    getJobRate, getWeaponRate,
  } from "../../stores/progress.js";
  import { WEAPONS } from "../../stores/selection.js";

  export let open = false;
  export let inline = false;

  const RUN_CHARS = (() => {
    const imgs = ['/img/mnk.png', '/img/war.png', '/img/blm.png', '/img/sch.png'];
    for (let i = imgs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    }
    const durations = [2.6, 2.8, 3.0, 3.3];
    return imgs.map((src, i) => ({ src, delay: `${i * 0.9}s`, dur: `${durations[i]}s` }));
  })();

  onMount(() => loadAllWeaponMetas());

  const ROLES = [
    { label: "タンク",     jobs: ["PLD","WAR","DRK","GNB"] },
    { label: "ヒーラー",   jobs: ["WHM","SCH","AST","SGE"] },
    { label: "メレー",     jobs: ["MNK","DRG","NIN","SAM","RPR","VPR"] },
    { label: "レンジ",     jobs: ["BRD","MCH","DNC"] },
    { label: "キャスター", jobs: ["BLM","SMN","RDM","PCT"] },
  ];

  let expandedWeapon = null;
  let searchString = "";
  let inputError = false;

  const LODESTONE_URL_RE = /finalfantasyxiv\.com\/lodestone\/character\/(\d+)\/?/;
  const LODESTONE_ID_RE  = /^\d+$/;

  async function onSearch() {
    const trimmed  = searchString.trim();
    const urlMatch = trimmed.match(LODESTONE_URL_RE);
    const idMatch  = trimmed.match(LODESTONE_ID_RE);
    const id       = urlMatch?.[1] ?? (idMatch ? trimmed : null);
    if (!id) { inputError = true; return; }
    inputError = false;
    searchString = "";
    await fetchCharacter(id);
  }

  function onKeydown(e) {
    if (e.key === "Enter") onSearch();
  }

  function close() { open = false; }

  function handleKeydown(e) {
    if (e.key === "Escape") close();
  }

  function daysSince(ts) {
    return Math.floor((Date.now() - ts * 1000) / 86400000);
  }

  function onShare(char) {
    const siteUrl   = "https://lastagous.com/gerolt-selection/";
    const hashtags  = "FF14,ゲロルトの工匠記録";
    const BLOCKS    = 8;
    const filled    = "■";
    const empty     = "・";

    let totalRate = 0;
    let lines = "";
    WEAPONS.forEach((weapon) => {
      const rate     = getWeaponRate($weaponMetas[weapon.key], weapon, char);
      totalRate     += rate;
      const blockNum = Math.floor(rate * BLOCKS);
      lines += `${weapon.key} [${filled.repeat(blockNum)}${empty.repeat(BLOCKS - blockNum)}] ${Math.floor(rate * 100)}%\n`;
    });

    const avgRate = Math.floor((totalRate * 100) / WEAPONS.length);
    const text = `${char.collect.character.name} の武器生成の達成度 ${avgRate}%\n\n${lines}`;

    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(text)}&hashtags=${hashtags}`,
      "_blank",
    );
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open || inline}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="{inline ? '' : 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70'}"
    on:click={inline ? null : (e) => e.target === e.currentTarget && close()}
  >
    <div class="{inline ? '' : 'gs-panel w-full max-w-lg flex flex-col max-h-[calc(100dvh-2rem)]'}">

      {#if !inline}
        <!-- ダイアログヘッダー -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gs-border flex-shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gs-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-medium">アチーブメント</span>
          </div>
          <button class="gs-btn p-1" on:click={close} aria-label="閉じる">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      {/if}

      <div class="p-4 space-y-5 {inline ? '' : 'overflow-y-auto flex-1 min-h-0'}">

        <!-- ── キャラクター ── -->
        <section>
          <p class="text-xs text-gs-muted mb-2">キャラクター</p>

          {#if $isFetching}
            <!-- スケルトン: キャラクターカード + 走るキャラクター -->
            <div class="relative overflow-hidden rounded-lg border border-gs-border mb-3">
              <!-- 走るキャラクター（背景） -->
              <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {#each RUN_CHARS as c}
                  <img src={c.src} alt="" class="run-char" style="--delay:{c.delay};--dur:{c.dur}" />
                {/each}
              </div>
              <!-- スケルトン（前面） -->
              <div class="relative z-10 flex items-center gap-3 p-2.5 animate-pulse">
                <div class="w-10 h-10 rounded bg-gs-border flex-shrink-0"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-3 rounded bg-gs-border w-2/3"></div>
                  <div class="h-2 rounded bg-gs-border w-1/3"></div>
                </div>
              </div>
            </div>
          {:else if $selectedCharacter}
            {@const char = $selectedCharacter}
            <!-- 登録済みキャラクター -->
            <div class="flex items-center gap-3 p-2.5 rounded-lg border border-gs-gold bg-gs-gold/5 mb-3">
              <img
                src={char.collect.character.avatar}
                alt={char.collect.character.name}
                class="w-10 h-10 rounded object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1 text-sm font-medium">
                  {#if !char.collect.character.achievements.public}
                    <svg class="w-3 h-3 text-gs-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  {/if}
                  <span class="truncate">{char.collect.character.name}</span>
                </div>
                <div class="text-xs text-gs-muted mt-0.5">{daysSince(char.updateTimestamp)}日前に更新</div>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <button
                  class="gs-btn p-1"
                  title="更新"
                  disabled={$isFetching}
                  on:click={() => fetchCharacter(String(char.collect.character.id))}
                >
                  <svg class="w-3.5 h-3.5 {$isFetching ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <button
                  class="gs-btn-danger p-1"
                  title="削除"
                  on:click={() => removeCharacter(char.collect.character.id)}
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
            <!-- シェア -->
            {#if char.collect.character.achievements.public}
              <button
                class="gs-btn w-full gap-2 mb-3"
                on:click={() => onShare(char)}
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25z"/>
                </svg>
                <span class="text-xs">X でシェア</span>
              </button>
            {/if}
            <!-- 変更用検索 -->
            <p class="text-xs text-gs-muted mb-1.5">別のキャラクターに変更</p>
          {/if}

          <!-- 検索フォーム -->
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={searchString}
              disabled={$isFetching}
              placeholder="Lodestone URL または キャラクター ID"
              class="gs-input flex-1 {inputError ? 'gs-input-error' : ''}"
              on:keydown={onKeydown}
            />
            <button
              class="gs-btn-primary flex-shrink-0 gap-1"
              disabled={$isFetching}
              on:click={onSearch}
            >
              {#if $isFetching}
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              {:else}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              {/if}
              Search
            </button>
          </div>
          {#if $fetchError}
            <p class="text-xs text-red-400 mt-1.5">{$fetchError}</p>
          {/if}
        </section>

        <!-- ── 進捗 ── -->
        {#if $isFetching}
          <section>
            <div class="h-3 rounded bg-gs-border w-1/3 mb-3 animate-pulse"></div>
            <div class="space-y-1 animate-pulse">
              {#each WEAPONS as _}
                <div class="flex items-center gap-3 px-2 py-2">
                  <div class="w-5 h-5 rounded bg-gs-border flex-shrink-0"></div>
                  <div class="w-32 h-3 rounded bg-gs-border flex-shrink-0"></div>
                  <div class="flex-1 h-1.5 rounded bg-gs-border"></div>
                  <div class="w-9 h-3 rounded bg-gs-border flex-shrink-0"></div>
                </div>
              {/each}
            </div>
          </section>
        {:else if $selectedCharacter && Object.keys($weaponMetas).length === 6}
          <section>
            <p class="text-xs text-gs-muted mb-2">進捗 — {$selectedCharacter.collect.character.name}</p>
            <div class="space-y-1">
              {#each WEAPONS as weapon}
                {@const rate = getWeaponRate($weaponMetas[weapon.key], weapon, $selectedCharacter)}
                {@const isExpanded = expandedWeapon === weapon.key}
                <div class="rounded-lg overflow-hidden">
                  <button
                    class="flex items-center gap-3 w-full px-2 py-2 text-left hover:bg-white/5 transition-colors rounded-lg"
                    on:click={() => (expandedWeapon = isExpanded ? null : weapon.key)}
                  >
                    <img src={`/icon/weapon/${weapon.key}.png`} alt={weapon.name} class="w-5 h-5 object-contain flex-shrink-0" />
                    <span class="text-sm w-40 truncate flex-shrink-0">{weapon.name}</span>
                    <div class="flex-1 gs-progress-bar">
                      <div
                        class="gs-progress-fill {rate >= 1 ? '!bg-gs-green' : ''}"
                        style="width:{Math.floor(rate * 100)}%"
                      ></div>
                    </div>
                    <span class="w-5 flex items-center justify-center flex-shrink-0">
                      {#if rate >= 1}
                        <svg class="w-4 h-4 text-gs-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                        </svg>
                      {:else}
                        <span class="text-xs text-gs-muted">{Math.floor(rate * 100)}%</span>
                      {/if}
                    </span>
                    <svg class="w-3 h-3 text-gs-muted flex-shrink-0 transition-transform {isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {#if isExpanded}
                    <div class="ml-4 mb-2 border-l border-gs-border pl-4">
                      <div class="grid grid-cols-8 gap-1">
                        {#each weapon.jobs as abbr}
                          {@const jrate = getJobRate($weaponMetas[weapon.key], abbr, $selectedCharacter)}
                          <div class="flex flex-col items-center gap-0.5 p-1.5 rounded">
                            <img src={`/icon/job/${abbr}.png`} alt={abbr} class="w-6 h-6 object-contain" />
                            <span class="text-[10px] {jrate >= 1 ? 'text-gs-green' : 'text-gs-muted'}">{abbr}</span>
                            <div class="w-full h-0.5 rounded-full bg-gs-border overflow-hidden">
                              <div
                                class="h-full rounded-full {jrate >= 1 ? 'bg-gs-green' : 'bg-gs-orange'}"
                                style="width:{Math.floor(jrate * 100)}%"
                              ></div>
                            </div>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </section>
        {:else if !$selectedCharacter}
          <p class="text-xs text-gs-muted text-center py-4">
            キャラクターを検索して進捗を確認できます
          </p>
        {/if}

      </div>
    </div>
  </div>
{/if}

<style>
  .run-char {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3.5rem;
    animation: run-left var(--dur, 3s) linear infinite;
    animation-delay: var(--delay, 0s);
    animation-fill-mode: backwards;
  }

  @keyframes run-left {
    from { transform: translateX(520px); }
    to   { transform: translateX(-80px); }
  }
</style>
