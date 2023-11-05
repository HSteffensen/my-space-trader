<script lang="ts">
    import { apiConfig, bearerToken } from "$lib/auth";
    import "../app.css";
    $bearerToken;
    $apiConfig;
</script>

<div class="flex flex-col min-h-screen bg-slate-200">
    <slot />
</div>
