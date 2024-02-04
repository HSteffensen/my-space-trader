import spacetraders from "./external";
import { bearerToken } from "$lib/auth";
import { derived, type Readable } from "svelte/store";
import { goto } from "$app/navigation";
import { AgentsApi, ContractsApi, FleetApi } from "$lib/generated/spacetraders-sdk";
import type { Agent, Ship, Contract } from "./model";
import { browser } from "$app/environment";

export const apiConfig = derived(bearerToken, (value) => authConfig(value));

function authConfig(token: string) {
    return spacetraders.createConfiguration({
        authMethods: { AgentToken: { tokenProvider: { getToken: () => token } } },
        promiseMiddleware: [new NoApiCallsFromServer(), new BadTokenToLogin()],
    });
}

class NoApiCallsFromServer implements spacetraders.Middleware {
    pre(context: spacetraders.RequestContext): Promise<spacetraders.RequestContext> {
        if (browser) {
            return Promise.resolve(context);
        } else {
            return new Promise(() => {});
        }
    }

    post(context: spacetraders.ResponseContext): Promise<spacetraders.ResponseContext> {
        return Promise.resolve(context);
    }
}

class BadTokenToLogin implements spacetraders.Middleware {
    pre(context: spacetraders.RequestContext): Promise<spacetraders.RequestContext> {
        return Promise.resolve(context);
    }

    post(context: spacetraders.ResponseContext): Promise<spacetraders.ResponseContext> {
        if (context.httpStatusCode === 401) {
            console.log("looks like the token is bad");
            context.body.text().then((body) => console.log(body));
            goto("/login");
        }
        return Promise.resolve(context);
    }
}

export const agentsApi = derived(apiConfig, (config) => new AgentsApi(config));
export const agent: Readable<Promise<Agent>> = derived(
    agentsApi,
    async (api) => (await api.getMyAgent()).data,
);

export const contractsApi = derived(apiConfig, (config) => new ContractsApi(config));
export const allContracts: Readable<Promise<Contract[]>> = derived(
    contractsApi,
    async (api) => (await api.getContracts()).data,
);

export const fleetApi = derived(apiConfig, (config) => new FleetApi(config));
export const allShips: Readable<Promise<Ship[]>> = derived(
    fleetApi,
    async (api) => (await api.getMyShips()).data,
);
