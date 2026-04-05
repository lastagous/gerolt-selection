<script lang="ts">
  import { onMount } from "svelte";
  import { selectedWeapon, selectedJob } from "../../stores/selection";
  import { selectedCharacter } from "../../stores/character";
  import {
    relations,
    relationsLoaded,
    loadRelations,
    getSteps,
    getJobRate,
  } from "../../stores/progress";
  import ZodiacInstructions from "./instructions/ZodiacInstructions.svelte";
  import AnimaInstructions from "./instructions/AnimaInstructions.svelte";
  import EurekaInstructions from "./instructions/EurekaInstructions.svelte";
  import ResistanceInstructions from "./instructions/ResistanceInstructions.svelte";
  import MandervilleInstructions from "./instructions/MandervilleInstructions.svelte";

  const LODESTONE_BASE = "https://jp.finalfantasyxiv.com/lodestone/playguide/db/";

  interface Tooltip {
    urlType: string;
    id: number;
    tooltipId: string;
  }

  let tooltips: Tooltip[] = [];

  onMount(async () => {
    await loadRelations();
    const res = await fetch("/data/tooltips.json");
    tooltips = await res.json();
  });

  function getTooltipUrl(id: number, urlType: string): string {
    const t = tooltips.find((x) => x.id === id && x.urlType === urlType);
    return `${LODESTONE_BASE}${urlType}/${t ? t.tooltipId + "/" : ""}`;
  }

  $: steps = $relationsLoaded ? getSteps($relations, $selectedWeapon, $selectedJob) : [];
  $: overallRate = $relationsLoaded
    ? Math.floor(getJobRate($relations, $selectedWeapon, $selectedJob, $selectedCharacter) * 100)
    : 0;

  let expandedIndex: number | null = null;
  function toggleExpand(i: number) {
    expandedIndex = expandedIndex === i ? null : i;
  }
</script>

<div class="space-y-2">
  {#if !$relationsLoaded}
    <div class="gs-panel p-4 text-center text-sm text-gs-muted">読み込み中...</div>
  {:else if !$selectedJob}
    <div class="gs-panel p-4 text-center text-sm text-gs-muted">
      左のリストからジョブを選択してください
    </div>
  {:else if steps.length === 0}
    <div class="gs-panel p-4 text-center text-sm text-gs-muted">
      {$selectedWeapon.name} / {$selectedJob} のステップデータがありません
    </div>
  {:else}
    <!-- ヘッダー -->
    <div class="gs-panel p-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img src={`/icon/weapon/${$selectedWeapon.key}.png`} alt={$selectedWeapon.name} class="w-8 h-8 object-contain" />
        <span class="font-medium">{$selectedWeapon.name}</span>
        <span class="text-gs-muted mx-1">/</span>
        <img src={`/icon/job/${$selectedJob}.png`} alt={$selectedJob} class="w-6 h-6 object-contain" />
        <span class="font-medium">{$selectedJob}</span>
      </div>
      <div class="text-sm text-gs-muted">
        達成度: <span class="text-gs-orange font-medium">{overallRate}%</span>
      </div>
    </div>

    <!-- ステップ一覧 -->
    {#each steps as step, i}
      {@const weapon = step.items[0]}
      {@const questList = step.quests ?? []}
      {@const achievementList = step.achievements ?? []}

      <div class="gs-panel overflow-hidden">
        <!-- ステップヘッダー -->
        <button
          class="w-full flex items-center gap-3 p-3 text-left hover:bg-white/5 transition-colors"
          on:click={() => toggleExpand(i)}
        >
          <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gs-border text-xs flex items-center justify-center text-gs-muted">
            {i + 1}
          </span>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium truncate">
              {weapon?.Name_ja ?? `ステップ ${i + 1}`}
            </div>
            {#if weapon}
              <div class="text-xs text-gs-muted">IL {weapon.LevelItem}</div>
            {/if}
          </div>
          {#if achievementList.length > 0 && $selectedCharacter}
            {@const owned = achievementList.filter((a) =>
              $selectedCharacter?.collect.achievements.some((ca) => ca.id === a.achievement.id)
            ).length}
            <span class="text-xs {owned === achievementList.length ? 'text-gs-green' : 'text-gs-muted'}">
              {owned}/{achievementList.length}
            </span>
          {/if}
          <svg
            class="w-4 h-4 text-gs-muted transition-transform {expandedIndex === i ? 'rotate-180' : ''}"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- 展開コンテンツ -->
        {#if expandedIndex === i}
          <div class="border-t border-gs-border p-3 space-y-3 text-sm">

            <!-- 作成手順 -->
            <div>
              <p class="text-xs text-gs-muted mb-2">作成手順</p>
              <div class="space-y-1 leading-relaxed">
                {#if $selectedWeapon.key === "ZW"}
                  <ZodiacInstructions {step} stepIndex={i} {steps} {tooltips} />
                {:else if $selectedWeapon.key === "AW"}
                  <AnimaInstructions {step} stepIndex={i} {steps} {tooltips} />
                {:else if $selectedWeapon.key === "EW"}
                  <EurekaInstructions {step} stepIndex={i} {steps} {tooltips} />
                {:else if $selectedWeapon.key === "RW"}
                  <ResistanceInstructions {step} stepIndex={i} {tooltips} />
                {:else if $selectedWeapon.key === "MW"}
                  <MandervilleInstructions {step} stepIndex={i} {tooltips} />
                {/if}
              </div>
            </div>

            <!-- クエスト -->
            {#if questList.length > 0}
              <div>
                <p class="text-xs text-gs-muted mb-1.5">関連クエスト</p>
                <ul class="space-y-1">
                  {#each questList as q}
                    <li class="flex items-center gap-2">
                      <span class="text-gs-gold">›</span>
                      <a
                        href={getTooltipUrl(q.quest.id, "quest")}
                        target="_blank"
                        rel="noopener"
                        class="eorzeadb_link text-gs-text hover:text-gs-gold hover:underline"
                      >
                        {q.quest.name}
                      </a>
                      {#if q.quest.location}
                        <span class="text-xs text-gs-muted">({q.quest.location})</span>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}

            <!-- 実績 -->
            {#if achievementList.length > 0}
              <div>
                <p class="text-xs text-gs-muted mb-1.5">実績</p>
                <ul class="space-y-1">
                  {#each achievementList as a}
                    {@const isComplete =
                      $selectedCharacter?.collect.achievements.some(
                        (ca) => ca.id === a.achievement.id
                      ) ?? false}
                    <li class="flex items-center gap-2">
                      <span class="w-3.5 h-3.5 flex-shrink-0">
                        {#if isComplete}
                          <svg class="text-gs-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                          </svg>
                        {:else}
                          <svg class="text-gs-border" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd"/>
                          </svg>
                        {/if}
                      </span>
                      <a
                        href={getTooltipUrl(a.achievement.id, "achievement")}
                        target="_blank"
                        rel="noopener"
                        class="eorzeadb_link {isComplete ? 'text-gs-green' : 'text-gs-text'} hover:underline"
                      >
                        {a.achievement.name ?? `実績 #${a.achievement.id}`}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}

          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>
