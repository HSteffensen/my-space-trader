<script lang="ts">
    import type { Ship } from "$lib/spacetraders/model";

    export let ship: Ship;
</script>

<div class="panel">
    <div class="flex justify-between data">
        <p>{ship.symbol}</p>
        <p>🚀{ship.registration.role}</p>
    </div>
    <div class="data">📍 {ship.nav.status} @ {ship.nav.waypointSymbol}</div>
    <div class="data">⛽ {ship.fuel.current} / {ship.fuel.capacity}</div>
    <div class="data">
        📦 {ship.cargo.units} / {ship.cargo.capacity}
        <ul>
            {#each ship.cargo.inventory as item}
                <li class="data">{item.units}x {item.name}</li>
            {/each}
        </ul>
    </div>
    {#if ship.cooldown.remainingSeconds > 0}
        <div class="data">
            ⏯️ {ship.cooldown.remainingSeconds} / {ship.cooldown.totalSeconds}
        </div>
    {/if}
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary;
        .data {
            @apply p-1;
        }
    }
</style>
