import spacetraders from "./external";
import { bearerToken } from "$lib/auth";
import { derived, type Readable } from "svelte/store";
import { goto } from "$app/navigation";
import { AgentsApi, FleetApi } from "$lib/generated/spacetraders-sdk";
import type { Agent, Ship } from "./model";
import { browser } from "$app/environment";

export const apiConfig = derived(bearerToken, (value) => authConfig(value));

function authConfig(token: string) {
    return spacetraders.createConfiguration({
        authMethods: { AgentToken: { tokenProvider: { getToken: () => token } } },
        promiseMiddleware: [new BadTokenToLogin()],
    });
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

function apiResponseStore<A, R>(
    apiStore: Readable<A>,
    f: (arg0: A) => Promise<R>,
): Readable<Promise<R>> {
    return derived(apiStore, (api) => {
        if (browser) {
            return f(api);
        } else {
            return new Promise<R>(() => {});
        }
    });
}

export const agentsApi = derived(apiConfig, (config) => new AgentsApi(config));
export const agent: Readable<Promise<Agent>> = apiResponseStore(
    agentsApi,
    async (api) => (await api.getMyAgent()).data,
);

export const fleetApi = derived(apiConfig, (config) => new FleetApi(config));
export const allShips: Readable<Promise<Ship[]>> = apiResponseStore(
    fleetApi,
    async (api) => (await api.getMyShips()).data,
);
