<script lang="ts">
    import { goto } from "$app/navigation";
    import { bearerToken } from "$lib/auth";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    onMount(() => {
        if (get(bearerToken) === "") {
            // TODO: do this with middleware on invalid token error instead
            console.log("empty bearer token, returning to login");
            goto("/login");
        }
    });
</script>

<slot />
