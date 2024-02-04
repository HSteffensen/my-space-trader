<script lang="ts">
    import type { Contract } from "$lib/spacetraders/model";
    import { allContracts } from "$lib/spacetraders/api";
    import ContractDisplay from "./ContractDisplay.svelte";

    let contractDatas: Contract[];
    $allContracts.then((contracts) => {
        contractDatas = contracts;
    });
</script>

<div class="panel">
    {#if contractDatas === undefined}
        <div class="self-center loading loading-spinner" />
    {:else if contractDatas.length === 0}
        No contracts available.
    {:else}
        {#each contractDatas as contract}
            <ContractDisplay bind:contract />
        {/each}
    {/if}
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary flex flex-col;
    }
</style>
