import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {borderRadius, boxShadows, colors} from "./global";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary
        },
        secondary: {
            main: colors.secondary,
        },
        background: {
            default: colors.white
        },
        divider: {
            main: '#EBF4FE'
        },
        action: {
            hover: colors.background,
            selected: colors.background,
        }
    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: colors.text,
                fontSize: '0.9rem',
            },
            filled: {
                color: colors.text,
            },
            shrink: {
                color: colors.primary,
            }
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: colors.primary,
                }
            }
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: 0,
                marginBottom: 0,
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: colors.background,
                borderRadius: borderRadius.m,
                '&:before': {
                    display: 'none',
                },
                '&:after': {
                    display: 'none',
                },
                '&:hover': {
                    backgroundColor: colors.background,
                },
                '&$focused': {
                    backgroundColor: colors.background,
                }
            },
        },
        MuiSelect: {
            select: {
                '&:focus': {
                    backgroundColor: colors.background,
                    borderRadius: borderRadius.m,
                }
            },
            selectMenu: {
                borderRadius: borderRadius.m,
                transition: 'box-shadow .3s',
                '&:hover': {
                    boxShadow: boxShadows.main,
                }
            }
        },
    },
    props: {
        MuiButton: {
            fullWidth: true,
        },
        MuiTextField: {
            fullWidth: true,
            variant: 'filled',
        },
        MuiSelect: {
            MenuProps: {
                getContentAnchorEl: null,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            }
        },
    },
    typography: {
        fontFamily: 'Raleway',
    },
    shape: {
        borderRadius: borderRadius.m,
    },
    shadows: [
        'none',
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
        boxShadows.main,
    ],
});