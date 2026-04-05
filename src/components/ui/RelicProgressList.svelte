<script lang="ts">
  import { onMount } from "svelte";
  import { ROLLS, getJobsByRoll } from "../../data/jobs";
  import { selectedWeapon, selectedJob } from "../../stores/selection";
  import { selectedCharacter } from "../../stores/character";
  import { relations, relationsLoaded, loadRelations, getJobRate } from "../../stores/progress";

  onMount(() => loadRelations());
</script>

<div class="gs-panel p-3">
  {#if !$relationsLoaded}
    <div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
  {:else}
    <div class="grid grid-cols-2 gap-x-4 gap-y-3">
      {#each ROLLS as roll}
        <div>
          <p class="text-xs text-gs-muted mb-1.5">{roll}</p>
          <div class="space-y-1.5">
            {#each getJobsByRoll(roll) as job}
              {#if $selectedWeapon.jobs.includes(job.abbr)}
                {@const rate = getJobRate($relations, $selectedWeapon, job.abbr, $selectedCharacter)}
                <button
                  class="flex items-center gap-2 w-full group"
                  on:click={() => selectedJob.set(job.abbr)}
                  title={job.nameJa}
                >
                  <img
                    src={job.iconPath}
                    alt={job.abbr}
                    class="w-7 h-7 object-contain flex-shrink-0
                      {$selectedJob === job.abbr ? 'ring-1 ring-gs-gold rounded' : ''}"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="gs-progress-bar">
                      <div
                        class="gs-progress-fill"
                        style="width: {Math.floor(rate * 100)}%"
                      ></div>
                    </div>
                  </div>
                  <span class="text-xs text-gs-muted w-8 text-right flex-shrink-0">
                    {Math.floor(rate * 100)}%
                  </span>
                </button>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
