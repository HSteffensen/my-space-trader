<script lang="ts">
    import { bearerToken } from "$lib/auth";
    import "../app.css";
    $bearerToken;
</script>

<div class="flex flex-col min-h-screen">
    <slot />
</div>
