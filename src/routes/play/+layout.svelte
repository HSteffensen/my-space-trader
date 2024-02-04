<script lang="ts">
    import AgentDisplay from "$lib/components/AgentDisplay.svelte";
    import TimeKeeper from "$lib/components/TimeKeeper.svelte";
    import { apiConfig } from "$lib/spacetraders/api";
    $apiConfig;
    export const prerender = false;
</script>

<TimeKeeper />
<div class="drawer drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content"><slot /></div>
    <div class="drawer-side">
        <label for="drawer" aria-label="close sidebar" class="drawer-overlay" />
        <div class="min-h-full p-4 w-80 bg-base-200">
            <AgentDisplay />
            <ul class="menu">
                <li><a href="#ships">Ships</a></li>
                <li><a href="#contracts">Contracts</a></li>
            </ul>
        </div>
    </div>
</div>
