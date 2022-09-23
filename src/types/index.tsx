export interface Theme {
  palette: {
    mode: string;
    primary: {
      main: string;
      light: string;
    };
    common: {
      white: string;
      black: string;
    };
    secondary: {
      main: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
}