import { browser } from "$app/environment";
import spacetraders from "$lib/spacetraders/external";
import { writable } from "svelte/store";

export const LOCALSTORAGE_TOKEN_KEY = "spaceTradersToken";

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

export function checkAgentExists(agentName: string) {
    const symbol = agentName.toUpperCase();
    const agentsApi = new spacetraders.AgentsApi(spacetraders.createConfiguration());
    return agentsApi
        .getAgentWithHttpInfo(symbol)
        .then((httpInfo) => httpInfo.httpStatusCode !== 404)
        .catch(() => false);
}

export function registerNewAgent(symbol: string, faction: spacetraders.FactionSymbols) {
    const defaultApi = new spacetraders.DefaultApi(spacetraders.createConfiguration());
    return defaultApi.register({ symbol, faction });
}

export const bearerToken = writable(
    (browser && localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)) || "",
);
