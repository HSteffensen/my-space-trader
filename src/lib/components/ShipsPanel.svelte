<script lang="ts">
    import type { Ship } from "$lib/spacetraders/model";
    import { allShips } from "$lib/spacetraders/api";
    import ShipDisplay from "./ShipDisplay.svelte";

    let shipDatas: Ship[] = [];
    $allShips.then((ships) => {
        shipDatas = ships;
    });
</script>

<div class="panel">
    {#if !shipDatas}
        <div class="self-center loading loading-spinner" />
    {/if}
    {#each shipDatas as ship}
        <ShipDisplay bind:ship />
    {/each}
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary flex flex-col;
    }
</style>
