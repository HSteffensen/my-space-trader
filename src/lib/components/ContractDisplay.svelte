<script lang="ts">
    import { contractsApi } from "$lib/spacetraders/api";
    import type { Contract } from "$lib/spacetraders/model";
    import { millisecondsToString, time } from "$lib/time";

    export let contract: Contract;

    function accept() {
        $contractsApi.acceptContract(contract.id);
    }
</script>

<div class="panel">
    <div class="data">
        {contract.accepted ? (contract.fulfilled ? "Fulfilled" : "Accepted") : "Available"}
        {contract.type} contract for {contract.factionSymbol}
    </div>
    {#if contract.terms.deliver}
        <div class="flex">
            <p class="self-center pr-1">🚚</p>
            <ul>
                {#each contract.terms.deliver as delivery}
                    <li>
                        {#if delivery.unitsFulfilled === 0}
                            Deliver {delivery.unitsRequired}
                        {:else}
                            Delivered {delivery.unitsFulfilled} of {delivery.unitsRequired}
                        {/if}
                        {delivery.tradeSymbol} to {delivery.destinationSymbol}.
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
    <div>
        <p>
            {#if !contract.accepted}
                &#x1FA99;{contract.terms.payment.onAccepted} in advance,
            {/if}
            &#x1FA99;{contract.terms.payment.onFulfilled} on completion.
        </p>
    </div>
    {#if !contract.accepted}
        {#if contract.deadlineToAccept}
            <div>
                Expires if not accepted within {millisecondsToString(
                    contract.deadlineToAccept.getTime() - $time.getTime(),
                )}
            </div>
        {/if}
        <button on:click={accept}>Accept</button>
    {:else}
        <div>
            Expires in {millisecondsToString(contract.terms.deadline.getTime() - $time.getTime())}
        </div>
    {/if}
</div>

<style>
    .panel {
        @apply p-1 border rounded-lg border-primary;
        .data {
            @apply p-1;
        }
    }
</style>
