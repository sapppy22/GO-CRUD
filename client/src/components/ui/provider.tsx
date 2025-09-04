// src/components/ui/provider.tsx
"use client";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../system"; // adjust relative path if needed

export function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
