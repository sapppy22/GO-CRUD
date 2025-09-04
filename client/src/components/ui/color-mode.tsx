"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { IconButton, Skeleton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import * as React from "react";

export interface ColorModeProviderProps {
  children: React.ReactNode;
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = (forcedTheme || resolvedTheme) as ColorMode;

  const toggleColorMode = () => {
    setTheme(colorMode === "dark" ? "light" : "dark");
  };

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();

  return (
    <React.Suspense fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    </React.Suspense>
  );
});
