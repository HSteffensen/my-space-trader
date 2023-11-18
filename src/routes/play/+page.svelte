<script lang="ts">
    import { browser } from "$app/environment";
    import type { Agent } from "$lib/spacetraders/model";
    import { agentsApi } from "$lib/spacetraders/api";

    let agentData: Agent;

    if (browser) {
        $agentsApi.getMyAgent().then((agent) => {
            agentData = agent.data;
        });
    }
</script>

{#if agentData}
    Logged in as agent {agentData.symbol}
{:else}
    Loading...
{/if}
