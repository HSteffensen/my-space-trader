<script lang="ts">
    import { checkAgentExists, getAgentInfoForToken } from "$lib/auth";
    import { FactionSymbols } from "$lib/spacetraders";

    let agentName: string = "";
    let agentNameLoading = false;
    let agentNameAvailable = false;
    $: agentNameTouched = agentName.length > 0;

    const factionsList = Object.values(FactionSymbols).toSorted();
    let faction = FactionSymbols.Cosmic;

    let token: string = "";
    let tokenLoading = false;
    let tokenValid = false;
    let tokenAgentName: string | null = null;
    $: tokenTouched = token.length > 0;

    let debounceTimer: number | undefined;

    function checkTokenExists() {
        tokenValid = false;
        clearTimeout(debounceTimer);
        tokenLoading = true;

        debounceTimer = setTimeout(async () => {
            getAgentInfoForToken(token)
                .then((result) => {
                    tokenAgentName = result.data.symbol;
                    tokenValid = true;
                    tokenLoading = false;
                })
                .catch(() => {
                    tokenValid = false;
                    tokenLoading = false;
                });
        }, 500);
    }

    function checkAgentNameAvailable() {
        agentNameAvailable = false;
        clearTimeout(debounceTimer);
        agentNameLoading = true;

        debounceTimer = setTimeout(async () => {
            checkAgentExists(agentName).then((result) => {
                agentNameAvailable = !result;
                agentNameLoading = false;
            });
        }, 500);
    }
</script>

<div class="flex content-between w-2/3 m-auto">
    <div>
        Create new agent
        <form class="flex flex-col">
            <input
                type="text"
                placeholder="Agent name"
                bind:value={agentName}
                on:input={checkAgentNameAvailable}
            />
            <select bind:value={faction}>
                {#each factionsList as factionOption}
                    <option value={factionOption}>{factionOption}</option>
                {/each}
            </select>
            <div>
                {#if agentNameLoading}
                    <p>Checking if this name is available...</p>
                {:else if agentNameTouched && agentNameAvailable}
                    <p>Agent name is available.</p>
                    <button>Start</button>
                {:else if agentNameTouched && !agentNameAvailable}
                    <p>Agent name is not available.</p>
                {/if}
            </div>
        </form>
    </div>
    <div class="mx-4">- OR -</div>

    <div>
        Use existing agent token
        <form>
            <input
                type="text"
                placeholder="Bearer token"
                bind:value={token}
                on:input={checkTokenExists}
            />
            <div>
                {#if tokenLoading}
                    <p>Checking if token is valid...</p>
                {:else if tokenTouched && tokenValid}
                    <p>Token is valid for agent '{tokenAgentName}'.</p>
                    <button>Start</button>
                {:else if tokenTouched && !tokenValid}
                    <p>Token is not valid.</p>
                {/if}
            </div>
        </form>
    </div>
</div>