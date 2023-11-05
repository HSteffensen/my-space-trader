import * as spacetraders from "$lib/spacetraders";
import { derived, writable } from "svelte/store";

function bearerTokenAuth(token: string) {
    return spacetraders.createConfiguration({
        authMethods: { AgentToken: { tokenProvider: { getToken: () => token } } },
    });
}

export function getAgentInfoForToken(token: string) {
    const config = bearerTokenAuth(token);
    const agentsApi = new spacetraders.AgentsApi(config);
    return agentsApi.getMyAgent();
}

export function checkAgentExists(symbol: string) {
    const agentsApi = new spacetraders.AgentsApi(spacetraders.createConfiguration());
    return agentsApi
        .getAgentWithHttpInfo(symbol)
        .then((httpInfo) => httpInfo.httpStatusCode !== 404)
        .catch(() => false);
}

export const bearerToken = writable("");

export const apiConfig = derived(bearerToken, (value) => bearerTokenAuth(value));
