import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    terciary: string;
    dark: string;
    light: string;
  }
}
