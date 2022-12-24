import { createTheme } from "@mui/material";

export const colors = {
    primary: "#D99937",
    secondary: "#052488",
    success: "#91de71",
    info: "#F9865F",
    danger: "#ff6363",
    warning: "#ff6d00",
    dark: "#D99937",
    light: "#A0C6F4",
    muted: "#B8B8B8",
    border: "#282973",
    text__color: "#606161",
    inverse: "",
    shaft: "",
    body__bg: "#f7f7f7",
    white: "#fff",
    black: "#000",
    link__primary: "#0277bd"
};

const fonts = {
    poppins: "Poppins",
    montserrat: "Montserrat"
}

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
            contrastText: colors.white
        },
        secondary: {
            main: colors.secondary,
            contrastText: colors.white
        },
        error: {
            main: colors.danger
        },
        warning: {
            main: colors.warning
        },
        success: {
            main: colors.success
        }
    },
    typography: {
        fontFamily: [...Object.keys(fonts).map((key) => fonts[key])],
        fontSize: 12,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        allVariants: {
            color: colors.text__color
        },
        button: {
            textTransform: 'none'
        }
    },
});

export default theme;