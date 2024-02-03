<script lang="ts">
    import type { Ship } from "$lib/spacetraders/model";

    export let ship: Ship;
</script>

<div class="panel">
    <div>
        {#if ship}
            <div class="data">{ship.symbol}</div>
        {:else}
            <div class="loading loading-spinner" />
        {/if}
    </div>
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary flex justify-center;
        div {
            @apply grid w-fit;
            grid-template-columns: auto auto;
            .data {
                @apply p-1;
            }
        }
    }
</style>
