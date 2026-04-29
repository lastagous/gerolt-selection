<script>
  import { onMount } from "svelte";
  import { selectedWeapon, selectedJob } from "../../stores/selection.js";
  import { selectedCharacter } from "../../stores/character.js";
  import { weaponMetas, loadWeaponMeta, getJobRate } from "../../stores/progress.js";
  export let onOpenAchievement = () => {};

  const JOBS = [
    { abbr: "PLD", nameJa: "ナイト",        roll: "タンク",     iconPath: "/icon/job/PLD.png" },
    { abbr: "WAR", nameJa: "戦士",          roll: "タンク",     iconPath: "/icon/job/WAR.png" },
    { abbr: "DRK", nameJa: "暗黒騎士",      roll: "タンク",     iconPath: "/icon/job/DRK.png" },
    { abbr: "GNB", nameJa: "ガンブレイカー", roll: "タンク",     iconPath: "/icon/job/GNB.png" },
    { abbr: "MNK", nameJa: "モンク",        roll: "メレー",     iconPath: "/icon/job/MNK.png" },
    { abbr: "DRG", nameJa: "竜騎士",        roll: "メレー",     iconPath: "/icon/job/DRG.png" },
    { abbr: "NIN", nameJa: "忍者",          roll: "メレー",     iconPath: "/icon/job/NIN.png" },
    { abbr: "SAM", nameJa: "侍",            roll: "メレー",     iconPath: "/icon/job/SAM.png" },
    { abbr: "RPR", nameJa: "リーパー",      roll: "メレー",     iconPath: "/icon/job/RPR.png" },
    { abbr: "VPR", nameJa: "ヴァイパー",    roll: "メレー",     iconPath: "/icon/job/VPR.png" },
    { abbr: "BRD", nameJa: "吟遊詩人",      roll: "レンジ",     iconPath: "/icon/job/BRD.png" },
    { abbr: "MCH", nameJa: "機工士",        roll: "レンジ",     iconPath: "/icon/job/MCH.png" },
    { abbr: "DNC", nameJa: "踊り子",        roll: "レンジ",     iconPath: "/icon/job/DNC.png" },
    { abbr: "BLM", nameJa: "黒魔道士",      roll: "キャスター",  iconPath: "/icon/job/BLM.png" },
    { abbr: "SMN", nameJa: "召喚士",        roll: "キャスター",  iconPath: "/icon/job/SMN.png" },
    { abbr: "RDM", nameJa: "赤魔道士",      roll: "キャスター",  iconPath: "/icon/job/RDM.png" },
    { abbr: "PCT", nameJa: "ピクトマンサー", roll: "キャスター",  iconPath: "/icon/job/PCT.png" },
    { abbr: "WHM", nameJa: "白魔道士",      roll: "ヒーラー",   iconPath: "/icon/job/WHM.png" },
    { abbr: "SCH", nameJa: "学者",          roll: "ヒーラー",   iconPath: "/icon/job/SCH.png" },
    { abbr: "AST", nameJa: "占星術師",      roll: "ヒーラー",   iconPath: "/icon/job/AST.png" },
    { abbr: "SGE", nameJa: "賢者",          roll: "ヒーラー",   iconPath: "/icon/job/SGE.png" },
  ];
  const ROLLS = ["タンク", "ヒーラー", "メレー", "レンジ", "キャスター"];

  $: loadWeaponMeta($selectedWeapon.key);
  $: meta = $weaponMetas[$selectedWeapon.key];
</script>

<div class="gs-panel p-3">
  <div class="hidden md:flex justify-center mb-3">
    <button
      class="gs-btn-primary text-xs whitespace-nowrap"
      on:click={onOpenAchievement}
    >
      アチーブメント取得状況
    </button>
  </div>
  {#if !meta}
    <div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
  {:else}
    <div class="flex flex-col gap-3">
      {#each ROLLS as roll}
        {@const rollJobs = JOBS.filter(j => j.roll === roll)}
        <div>
          <p class="text-xs text-gs-muted mb-1.5">{roll}</p>
          <div class="grid grid-cols-4 gap-1">
            {#each rollJobs as job}
              {@const available = $selectedWeapon.jobs.includes(job.abbr)}
              {@const rate = available ? getJobRate(meta, job.abbr, $selectedCharacter) : 0}
              <button
                class="flex flex-col items-center gap-1 p-1.5 rounded transition-colors
                  {!available
                    ? 'opacity-25 cursor-not-allowed'
                    : $selectedJob === job.abbr
                      ? 'bg-gs-gold/10 ring-1 ring-inset ring-gs-gold'
                      : 'hover:bg-white/5'}"
                on:click={() => available && selectedJob.set(job.abbr)}
                disabled={!available}
                title={job.nameJa}
              >
                <img
                  src={job.iconPath}
                  alt={job.abbr}
                  class="w-7 h-7 object-contain"
                />
                <span class="text-[10px] font-medium leading-none">{job.abbr}</span>
                {#if $selectedCharacter && available}
                  <div class="w-full h-0.5 rounded-full bg-gs-border overflow-hidden mt-0.5">
                    <div
                      class="h-full rounded-full {rate >= 1 ? 'bg-gs-green' : 'bg-gs-orange'}"
                      style="width: {Math.floor(rate * 100)}%"
                    ></div>
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
