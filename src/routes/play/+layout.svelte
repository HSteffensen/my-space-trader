<script lang="ts">
    import { goto } from "$app/navigation";
    import { bearerToken } from "$lib/auth";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    onMount(() => {
        if (get(bearerToken) === "") {
            goto("/login");
        }
    });
</script>

<slot />
