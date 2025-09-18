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
  new CustomColors("background", "rgba(0,0,0,1)", "rgba(239, 239, 239, 1)"),
  new CustomColors("text", "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"),
  new CustomColors("backgroundItem", "rgba(19, 19, 19, 1)", "rgba(255, 255, 255, 1)")
] as const;

export type OrbytColorName = typeof orbytColors[number]["name"];

export function useOrbytColor(name: OrbytColorName): string {
  const colorScheme = useColorScheme() ?? "light";
  const color = orbytColors.find((c) => c.name === name);
  if (!color) return "#ffffff"; 
  return colorScheme === "light" ? color.light : color.dark;
}
