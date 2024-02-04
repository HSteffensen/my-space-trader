<script lang="ts">
    import { agent } from "$lib/spacetraders/api";
    import type { Agent } from "$lib/spacetraders/model";

    let agentData: Agent;
    $agent.then((agent) => {
        agentData = agent;
    });
    $: skeleton = !agentData;
</script>

<div class="panel">
    <p class="icon">👨‍🚀</p>
    <div class:skeleton class="data">{agentData?.symbol ?? ""}</div>
    <p class="icon">✨</p>
    <div class:skeleton class="data">{agentData?.startingFaction ?? ""}</div>
    <p class="icon">&#x1FA99;<!-- Coin emoji doesn't show in my editor font --></p>
    <div class:skeleton class="data">{agentData?.credits ?? ""}</div>
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary grid;
        grid-template-columns: auto 1fr;
        .icon,
        .data {
            @apply p-1;
        }
        .icon {
            @apply justify-self-center;
        }
        .data.skeleton {
            @apply w-full h-[1lh] self-center;
        }
    }
</style>
