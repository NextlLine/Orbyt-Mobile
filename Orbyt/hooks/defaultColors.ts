import { useColorScheme } from "react-native";

export class CustomColors {
    name: string;
    dark: string;
    light: string;

    constructor(name: string, dark: string, light: string) {
        this.name = name;
        this.dark = dark;
        this.light = light;
    }
}

export const orbytColors = [
    new CustomColors("main", "rgba(0, 17, 73, 1)", "rgba(4,63,255,1)"),
    new CustomColors("background", "rgba(28, 29, 32, 1)", "rgba(239, 239, 239, 1)"),
    new CustomColors("backgroundItem", "rgba(39, 39, 44, 1)", "rgba(255, 255, 255, 1)"),
    new CustomColors("text", "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"),
    new CustomColors("gain", "rgba(0, 168, 3, 1)", "rgba(1, 92, 2, 1)"),
    new CustomColors("loose", "rgba(225, 0, 0, 1)", "rgba(133, 0, 0, 1)"),
    new CustomColors("gainGraph", "rgba(51, 90, 51, 1)", "rgba(98, 209, 100, 1)"),
    new CustomColors("looseGraph", "rgba(132, 13, 13, 1)", "rgba(195, 97, 97, 1)"),
    new CustomColors('activeTag', "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"),
    new CustomColors('primary', "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"),
    new CustomColors('secondary', "rgba(200, 200, 200, 1)", "rgba(83, 83, 83, 1)"),

] as const;

export type OrbytColorName = typeof orbytColors[number]["name"];

export function useOrbytColor(name: OrbytColorName): string {
    const colorScheme = useColorScheme() ?? "light";
    const color = orbytColors.find((c) => c.name === name);
    if (!color) return "#ffffff";
    return colorScheme === "light" ? color.light : color.dark;
}
