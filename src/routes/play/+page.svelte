<script lang="ts">
    import AgentDisplay from "$lib/components/AgentDisplay.svelte";
    import ShipSelector from "$lib/components/ShipSelector.svelte";
</script>

<div class="drawer lg:drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content">
        <div class="w-full navbar bg-base-300 lg:hidden">
            <div class="flex-none">
                <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-6 h-6 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        /></svg
                    >
                </label>
            </div>
            <AgentDisplay />
        </div>
        <!-- Page content here -->
        Content
    </div>
    <div class="drawer-side">
        <label for="drawer" aria-label="close sidebar" class="drawer-overlay" />
        <div class="min-h-full p-4 w-80 bg-base-200">
            <div class="hidden lg:block"><AgentDisplay /></div>
            <ul class="menu">
                <!-- Sidebar content here -->
                <li>
                    <details open>
                        <summary>Ships</summary>
                        <ShipSelector />
                    </details>
                </li>
                <li>Sidebar Item 2</li>
            </ul>
        </div>
    </div>
</div>
