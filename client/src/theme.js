import { responsiveFontSizes } from "@mui/material";
import { createTheme, alpha } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

let theme = createTheme({
  // palette: {
  //   background: {
  //     default: "rgb(254, 249, 245)", // blush pink
  //   },
  // },
  palette: {
    // mode: "dark",
    grey: {
      main: grey[300],
      dark: grey[400],
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    // htmlFontSize: 16,
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
    h4: {
      fontWeight: 700,
      letterSpacing: "normal",
      lineHeight: 1.2,
      fontSize: "1.175rem",
    },
  },
});

// For v4 style buttons
theme = createTheme(theme, {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "grey" },
          style: {
            color: theme.palette.getContrastText(theme.palette.grey[300]),
          },
        },
        {
          props: { variant: "outlined", color: "grey" },
          style: {
            color: theme.palette.text.primary,
            borderColor:
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.23)"
                : "rgba(255, 255, 255, 0.23)",
            "&.Mui-disabled": {
              border: `1px solid ${theme.palette.action.disabledBackground}`,
            },
            "&:hover": {
              borderColor:
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.23)"
                  : "rgba(255, 255, 255, 0.23)",
              backgroundColor: alpha(
                theme.palette.text.primary,
                theme.palette.action.hoverOpacity
              ),
            },
          },
        },
        {
          props: { color: "grey", variant: "text" },
          style: {
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(
                theme.palette.text.primary,
                theme.palette.action.hoverOpacity
              ),
            },
          },
        },
      ],
    },
  },
});

export default responsiveFontSizes(theme);
