declare module "@mui/material" {
  interface TypeText {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
  }

  // createTheme uses ThemeOptions as argument type which uses PaletteOptions as type for palette property
  interface PaletteOptions {
    custom: {
      backgroundLight: string;
      backgroundDark: string;
      backdrop: string;
    };
  }

  // The 'Theme' type Theme type which uses Palette as type for palette property
  // so we have to modify both PaletteOptions and Palette for better linting and code completion
  interface Palette {
    custom: {
      backgroundLight: string;
      backgroundDark: string;
      backdrop: string;
    };
  }
}

declare module "react-router-dom" {
  interface LinkProps {
    isActive: boolean;
  }
}

export {};
