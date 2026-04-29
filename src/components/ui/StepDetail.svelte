<script>
  import { selectedWeapon, selectedJob } from "../../stores/selection.js";
  import { selectedCharacter } from "../../stores/character.js";
  import { weaponMetas, loadWeaponMeta, getSteps } from "../../stores/progress.js";
  import { questUrl, achievementUrl } from "./instructions/_helpers.js";
  import ZodiacInstructions      from "./instructions/ZodiacInstructions.svelte";
  import AnimaInstructions       from "./instructions/AnimaInstructions.svelte";
  import EurekaInstructions      from "./instructions/EurekaInstructions.svelte";
  import ResistanceInstructions  from "./instructions/ResistanceInstructions.svelte";
  import MandervilleInstructions from "./instructions/MandervilleInstructions.svelte";
  import PhantomInstructions     from "./instructions/PhantomInstructions.svelte";

  $: loadWeaponMeta($selectedWeapon.key);
  $: meta  = $weaponMetas[$selectedWeapon.key];
  $: steps = getSteps(meta, $selectedJob);
</script>

<div class="space-y-4">
  {#if !meta}
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
    {#each steps as step, i}
      {@const questList = step.quests ?? []}
      {@const achievementList = step.achievements ?? []}
      {@const stepPatch = $selectedWeapon.stepPatches?.[i]}

      <div id="step-{i}" class="gs-panel overflow-hidden scroll-mt-16">
        <!-- ステップヘッダー -->
        <div class="flex items-center gap-3 p-3 border-b border-gs-border">
          <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gs-border text-xs flex items-center justify-center text-gs-muted">
            {i + 1}
          </span>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium truncate">{step.nameJa ?? `ステップ ${i + 1}`}</div>
            <div class="text-xs text-gs-muted">IL {step.levelItem}{#if stepPatch} - Patch {stepPatch}{/if}</div>
          </div>
          {#if achievementList.length > 0 && $selectedCharacter}
            {@const owned = achievementList.filter((a) =>
              $selectedCharacter?.collect.achievements.some((ca) => ca.id === a.id)
            ).length}
            <span class="flex-shrink-0 text-xs px-1.5 py-0.5 rounded
              {owned === achievementList.length ? 'text-gs-green' : 'text-gs-muted'}">
              {#if owned === achievementList.length}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
              {:else}
                {owned}/{achievementList.length}
              {/if}
            </span>
          {/if}
        </div>

        <!-- コンテンツ -->
        <div class="p-3 space-y-4 text-sm">
          <!-- 作成手順 -->
          <div>
            <p class="text-xs text-gs-muted mb-2">作成手順</p>
            <div class="space-y-1 leading-relaxed">
              {#if $selectedWeapon.key === "ZW"}
                <ZodiacInstructions {step} stepIndex={i} {steps} job={$selectedJob} />
              {:else if $selectedWeapon.key === "AW"}
                <AnimaInstructions {step} stepIndex={i} {steps} />
              {:else if $selectedWeapon.key === "EW"}
                <EurekaInstructions {step} stepIndex={i} {steps} />
              {:else if $selectedWeapon.key === "RW"}
                <ResistanceInstructions {step} stepIndex={i} />
              {:else if $selectedWeapon.key === "MW"}
                <MandervilleInstructions {step} stepIndex={i} />
              {:else if $selectedWeapon.key === "PW"}
                <PhantomInstructions stepIndex={i} />
              {/if}
            </div>
          </div>

          <!-- クエスト -->
          {#if questList.length > 0}
            <div>
              <p class="text-xs text-gs-muted mb-1.5">関連クエスト</p>
              <ul class="space-y-1">
                {#each questList as q}
                  <li class="flex items-center gap-2 text-xs">
                    <span class="text-gs-gold">›</span>
                    <a href={questUrl(q.id)} target="_blank" rel="noopener" class="eorzeadb_link">
                      {q.name}
                    </a>
                    {#if q.location}
                      <span class="text-gs-muted">({q.location})</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- アチーブメント -->
          {#if achievementList.length > 0}
            <div>
              <p class="text-xs text-gs-muted mb-1.5">アチーブメント</p>
              <ul class="space-y-1">
                {#each achievementList as a}
                  {@const isComplete = $selectedCharacter?.collect.achievements.some(
                    (ca) => ca.id === a.id
                  ) ?? false}
                  {@const url = achievementUrl(a.id)}
                  <li class="flex items-center gap-2 text-xs">
                    <span class="text-gs-gold">›</span>
                    {#if url}
                      <a href={url} target="_blank" rel="noopener"
                        class="eorzeadb_link {isComplete ? 'text-gs-green' : ''}">
                        {a.name ?? `アチーブメント #${a.id}`}
                      </a>
                    {:else}
                      <span class={isComplete ? 'text-gs-green' : ''}>
                        {a.name ?? `アチーブメント #${a.id}`}
                      </span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  {/if}
</div>
