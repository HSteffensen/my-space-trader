import spacetraders from "./external";
import { bearerToken } from "$lib/auth";
import { derived } from "svelte/store";
import { goto } from "$app/navigation";
import { AgentsApi } from "$lib/generated/spacetraders-sdk";

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

export const agentsApi = derived(apiConfig, (config) => new AgentsApi(config));
