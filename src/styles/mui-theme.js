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
        divider: 'rgba(0,0,0,0)',
        action: {
            hover: colors.background,
            selected: colors.background,
            disabledBackground: colors.disabledBackground,
        },
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
                },
            }
        },
        MuiInputBase: {
          root: {
              fontSize: '0.9rem',
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
                },
                '&$disabled': {
                    backgroundColor: colors.disabledBackground,
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
        MuiTableRow: {
            root: {
                transition: 'all .3s',
                borderRadius: borderRadius.s,
                '&:hover': {
                    backgroundColor: colors.background,
                }
            }
        },
        MuiTableCell: {
            root: {
                padding: '10px',
                borderBottom: 'none',
            }
        },
        MuiExpansionPanel: {
            root: {
                margin: 0,
                boxShadow: 'none',
                borderRadius: 0,
                '&:before': {
                    display: 'none',
                },
                '&$expanded': {
                    margin: 0,
                },
            },
            rounded: {
                '&:last-child': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }
            },
        },
        MuiExpansionPanelSummary: {
            content: {
                '&$expanded': {
                    margin: '12px 0',
                },
            },
        }
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
        MuiExpansionPanel: {
            TransitionProps: {
                unmountOnExit: true,
            }
        }
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