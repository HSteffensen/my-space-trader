<script lang="ts">
    import type { Agent } from "$lib/spacetraders/model";
    import { agentsApi } from "$lib/spacetraders/api";
    import { browser } from "$app/environment";

    let agentData: Agent;
    if (browser) {
        $agentsApi.getMyAgent().then((agent) => {
            agentData = agent.data;
        });
    }
</script>

<div class="p-4 border rounded-lg border-primary">
    {#if agentData}
        <div>
            <div>👨‍🚀{agentData.symbol}</div>
            <div>✨{agentData.startingFaction}</div>
            <div>
                &#x1FA99;<!-- Coin emoji doesn't show in my editor font -->
                {agentData.credits}
            </div>
        </div>
    {:else}
        <div class="loading loading-spinner" />
    {/if}
</div>
