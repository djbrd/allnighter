import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#FFFDFC",
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.2,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "normal",
      lineHeight: 1.2,
      fontSize: "1.875rem",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "normal",
      lineHeight: 1.2,
      fontSize: "1.5rem",
    },
  },
});

export default responsiveFontSizes(theme);
