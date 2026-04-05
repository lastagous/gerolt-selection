<script lang="ts">
  import { WEAPONS } from "../../data/weapons";
  import { selectedWeapon } from "../../stores/selection";
</script>

<div class="gs-panel p-3">
  <ul class="space-y-1">
    {#each WEAPONS as weapon}
      <li>
        <button
          class="flex items-center gap-3 w-full px-3 py-2 rounded text-sm transition-colors
            {$selectedWeapon.key === weapon.key
              ? 'bg-gs-gold/20 border border-gs-gold text-gs-gold'
              : 'border border-transparent hover:border-gs-border text-gs-text hover:text-gs-gold'}"
          on:click={() => selectedWeapon.set(weapon)}
        >
          <img
            src={`/icon/weapon/${weapon.key}.png`}
            alt={weapon.name}
            class="w-8 h-8 object-contain"
          />
          <span>{weapon.name}</span>
        </button>
      </li>
    {/each}
  </ul>
</div>
