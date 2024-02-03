import * as ApiModel from "$lib/generated/spacetraders-sdk/models/all";

export type Agent = {
    accountId?: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount?: number;
};

export type Ship = {
    symbol: string;
    registration: ApiModel.ShipRegistration;
    nav: ApiModel.ShipNav;
    crew: ApiModel.ShipCrew;
    frame: ApiModel.ShipFrame;
    reactor: ApiModel.ShipReactor;
    engine: ApiModel.ShipEngine;
    cooldown: ApiModel.Cooldown;
    modules: Array<ApiModel.ShipModule>;
    mounts: Array<ApiModel.ShipMount>;
    cargo: ApiModel.ShipCargo;
    fuel: ApiModel.ShipFuel;
};
