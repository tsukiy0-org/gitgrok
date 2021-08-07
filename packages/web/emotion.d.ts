import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    font: {
      primary: string;
      secondary: string;
    };
    color: {
      text: string;
      primary: string;
      secondary: string;
      muted: string;
    };
    breakpoints: {
      md: string;
      lg: string;
    };
  }
}
