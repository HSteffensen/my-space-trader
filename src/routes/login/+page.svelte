<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import {
        LOCALSTORAGE_TOKEN_KEY,
        bearerToken,
        checkAgentExists,
        getAgentInfoForToken,
        registerNewAgent,
    } from "$lib/auth";
    import { FactionSymbols } from "$lib/generated/spacetraders-sdk/models/all";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let previousLoginInvalid = false;

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

    onMount(() => {
        const existingToken = get(bearerToken);
        if (existingToken !== "") {
            tokenLoading = true;
            getAgentInfoForToken(existingToken)
                .then((result) => {
                    token = existingToken;
                    tokenAgentName = result.data.symbol;
                    tokenLoading = false;
                })
                .catch((error) => {
                    previousLoginInvalid = true;
                    logout();
                    tokenLoading = false;
                });
        }
    });

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

    function startWithToken(newToken: string) {
        bearerToken.set(newToken);
        window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, newToken);
        goto("/play");
    }

    function register() {
        registerNewAgent(agentName, faction).then((agentData) => {
            startWithToken(agentData.data.token);
        });
    }

    function login() {
        // bug: the goto() doesn't work without this...
        setTimeout(() => startWithToken(token), 0);
    }

    function logout() {
        token = "";
        bearerToken.set("");
        window.localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    }
</script>

{#if true}
    <p role="alert" class="alert alert-warning sm:mx-auto sm:w-fit sm:px-16">
        The previous login was invalidated.
    </p>
{/if}
<div class="flex justify-between m-auto">
    {#if !browser}
        <div class="loading loading-spinner" />
    {:else if $bearerToken === ""}
        <div class="card bg-neutral text-neutral-content">
            <div class="card-body">
                Create new agent
                <form class="flex flex-col">
                    <input
                        type="text"
                        class="uppercase"
                        placeholder="Agent name"
                        bind:value={agentName}
                        on:input={checkAgentNameAvailable}
                    />
                    <select bind:value={faction}>
                        {#each factionsList as factionOption}
                            <option value={factionOption}>{factionOption}</option>
                        {/each}
                    </select>
                    <div class="h-4">
                        {#if agentNameLoading}
                            <p>Checking if this name is available...</p>
                        {:else if agentNameTouched && agentNameAvailable}
                            <p>Agent name is available.</p>
                            <button on:click={register}>Start</button>
                        {:else if agentNameTouched && !agentNameAvailable}
                            <p>Agent name is not available.</p>
                        {/if}
                    </div>
                </form>
            </div>
        </div>
        <div class="divider divider-horizontal">OR</div>
        <div class="card bg-neutral text-neutral-content">
            <div class="card-body">
                Use existing agent token
                <form>
                    <input
                        type="text"
                        placeholder="Bearer token"
                        bind:value={token}
                        on:input={checkTokenExists}
                    />
                    <div class="h-4">
                        {#if tokenLoading}
                            <p>Checking if token is valid...</p>
                        {:else if tokenTouched && tokenValid}
                            <p>Token is valid for agent '{tokenAgentName}'.</p>
                            <button on:click={login}>Start</button>
                        {:else if tokenTouched && !tokenValid}
                            <p>Token is not valid.</p>
                        {/if}
                    </div>
                </form>
            </div>
        </div>
    {:else if tokenLoading}
        <div class="loading loading-spinner" />
    {:else}
        <div class="flex flex-col">
            Logged in as agent '{tokenAgentName}'.
            <button on:click={login}>Continue</button>
            <button on:click={logout}>Log out</button>
        </div>
    {/if}
</div>
