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
  new CustomColors("main", "#060134", "#043FFF"),
  new CustomColors("background", "#383838", "#F3F4F7"),
] as const;

export type OrbytColorName = typeof orbytColors[number]["name"];

export function useOrbytColor(name: OrbytColorName): string {
  const colorScheme = useColorScheme() ?? "light";
  const color = orbytColors.find((c) => c.name === name);
  if (!color) return "#ffffff"; 
  return colorScheme === "light" ? color.light : color.dark;
}
