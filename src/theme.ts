import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { purple, green } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const commonThemePalette = {};
// Create a theme instance.
const theme = (mode: string) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#0097d8",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },

      action: {
        active: "#fff",
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            borderBottom: "0px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "transparent",
          },
        },
      },
    },
  });
};
export default theme;
