<script lang="ts">
    import { page } from "$app/stores";
    import ContractsPanel from "$lib/components/ContractsPanel.svelte";
    import ShipsPanel from "$lib/components/ShipsPanel.svelte";
</script>

{#if $page.url.hash === "#contracts"}
    <ContractsPanel />
{:else}
    <ShipsPanel />
{/if}
