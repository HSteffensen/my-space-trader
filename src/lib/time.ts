import { readonly, writable } from "svelte/store";

export const timeKeeper = writable<Date>(new Date());
export const time = readonly(timeKeeper);

export function millisecondsToString(millis: number): string {
    let result = "";
    if (millis < 0) {
        result += "-";
        millis = Math.abs(millis);
    }
    const seconds = Math.floor(millis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        result += `${days}D`;
    }
    if (hours > 0) {
        result += `${hours % 24}H`;
    }
    if (minutes > 0) {
        result += `${minutes % 60}M`;
    }
    if (seconds > 0) {
        result += `${seconds % 60}S`;
    }
    return result;
}
