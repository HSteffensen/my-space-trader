<script lang="ts">
    import { timeKeeper } from "$lib/time";
    import { onMount } from "svelte";

    onMount(() => {
        const interval = setInterval(() => {
            timeKeeper.set(new Date());
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });
</script>
