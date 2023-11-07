<script lang="ts">
    import { goto } from "$app/navigation";
    import { bearerToken, getAgentInfoForToken } from "$lib/auth";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    onMount(() => {
        let token = get(bearerToken);
        if (token === "") {
            goto("/login");
        }
        getAgentInfoForToken(token)
            .then(() => goto("/play"))
            .catch(() => goto("/login"));
    });
</script>
