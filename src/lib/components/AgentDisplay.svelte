<script lang="ts">
    import { agent } from "$lib/spacetraders/api";
</script>

<div class="panel">
    <div class="panel-grid">
        {#await $agent}
            <div class="loading loading-spinner" />
        {:then agentData}
            <p class="icon">👨‍🚀</p>
            <div class="data">{agentData.symbol}</div>
            <p class="icon">✨</p>
            <div class="data">{agentData.startingFaction}</div>
            <p class="icon">&#x1FA99;<!-- Coin emoji doesn't show in my editor font --></p>
            <div class="data">{agentData.credits}</div>
        {/await}
    </div>
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary flex justify-center;
        .panel-grid {
            @apply grid w-fit;
            grid-template-columns: auto auto;
            .icon,
            .data {
                @apply p-1;
            }
            .icon {
                @apply justify-self-center;
            }
        }
    }
</style>
