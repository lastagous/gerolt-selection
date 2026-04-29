<script>
  import { selectedWeapon, selectedJob } from "../../stores/selection.js";
  import { selectedCharacter } from "../../stores/character.js";
  import { weaponMetas, loadWeaponMeta, getSteps } from "../../stores/progress.js";
  import { base } from "../../lib/base.js";

  $: loadWeaponMeta($selectedWeapon.key);
  $: meta  = $weaponMetas[$selectedWeapon.key];
  $: steps = getSteps(meta, $selectedJob);

  function scrollToStep(e, i) {
    e.preventDefault();
    // Tablet and desktop layouts both render <StepDetail>, creating duplicate IDs.
    // getElementById returns the first match (tablet = display:none on desktop),
    // so we must find the actually visible element.
    const el = Array.from(document.querySelectorAll(`#step-${i}`))
      .find(node => node.offsetParent !== null);
    if (!el) return;
    const scrollEl = document.scrollingElement ?? document.documentElement;
    const header = document.querySelector("header");
    const headerH = header ? header.getBoundingClientRect().height : 48;
    const top = scrollEl.scrollTop + el.getBoundingClientRect().top - headerH;
    scrollEl.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
</script>

{#if meta && $selectedJob && steps.length > 0}
  <div class="gs-panel p-3">
    <div class="flex items-center gap-1.5 mb-2">
      <img src={`${base}/icon/weapon/${$selectedWeapon.key}.png`} alt={$selectedWeapon.name} class="w-4 h-4 object-contain" />
      <span class="text-xs font-medium text-gs-muted">{$selectedWeapon.name}</span>
    </div>
    <nav class="space-y-0.5">
      {#each steps as step, i}
        {@const achievementList = step.achievements ?? []}
        {@const owned = achievementList.length > 0 && $selectedCharacter
          ? achievementList.filter((a) =>
              $selectedCharacter?.collect.achievements.some((ca) => ca.id === a.id)
            ).length
          : -1}
        {@const isComplete = owned >= 0 && owned === achievementList.length}
        <a
          href="#step-{i}"
          on:click={(e) => scrollToStep(e, i)}
          class="flex items-center gap-1.5 px-1.5 py-1 rounded text-xs text-gs-text hover:text-gs-gold hover:bg-white/5 transition-colors group"
        >
          <span class="relative flex-shrink-0 w-4 h-4">
            <span class="w-4 h-4 rounded-full {isComplete ? 'bg-gs-green/20' : 'bg-gs-border'} text-[10px] flex items-center justify-center {isComplete ? 'text-gs-green' : 'text-gs-muted group-hover:text-gs-gold'}">
              {#if isComplete}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              {:else}
                {i + 1}
              {/if}
            </span>
            {#if owned >= 0 && !isComplete}
              <span class="absolute -bottom-0.5 -right-0.5 text-[8px] leading-none text-gs-muted bg-gs-dark rounded-full px-0.5">{owned}/{achievementList.length}</span>
            {/if}
          </span>
          <span class="truncate">{step.nameJa ?? `ステップ ${i + 1}`}</span>
        </a>
      {/each}
    </nav>
  </div>
{/if}
