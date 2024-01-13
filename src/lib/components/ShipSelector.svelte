<script lang="ts">
    import type { Ship } from "$lib/spacetraders/model";
    import { fleetApi } from "$lib/spacetraders/api";
    import { browser } from "$app/environment";

    let ships: Ship[];
    if (browser) {
        $fleetApi.getMyShips().then((shipsResponse) => {
            ships = shipsResponse.data;
        });
    }
</script>

<ul>
    {#if ships}
        {#each ships as ship}
            <li><a>{ship.symbol}</a></li>
        {/each}
    {:else}
        <div class="loading loading-spinner" />
    {/if}
</ul>
