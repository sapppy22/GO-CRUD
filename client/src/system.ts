// src/system.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        bg: {
          light: { value: "{colors.gray.50}" },   
          dark: { value: "{colors.gray.900}" },   
        },
        text: {
          light: { value: "{colors.gray.900}" },  
          dark: { value: "{colors.white}" },      
        },
        brand: {
          500: { value: "#3182ce" },
          600: { value: "#2b6cb0" },
        },
      },
    },
  },
});
