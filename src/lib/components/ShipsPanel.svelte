<script lang="ts">
    import type { Ship } from "$lib/spacetraders/model";
    import { allShips, fleetApi } from "$lib/spacetraders/api";
    import { browser } from "$app/environment";

    let shipDatas: Ship[];
    if (browser) {
        $allShips.then(
            (ships) => {
                shipDatas = ships;
            },
            (err) => console.error(err),
        );
    }
</script>

<div class="panel">
    {#if shipDatas}
        <ul>
            {#each shipDatas as ship}
                <li>{ship.symbol}</li>
            {/each}
        </ul>
    {:else}
        <div class="loading loading-spinner" />
    {/if}
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary;
    }
</style>
