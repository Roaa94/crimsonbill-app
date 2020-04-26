import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const colors = {
    primary: '#0E2549',
    secondary: '#CE4C50',
    info: '#8DBADF',
    background: '#F4F6F8',
    secondaryLight: '#FBE8E8',
    infoLight: '#DAE8F4',
    white: '#FFFFFF',
};

export const boxShadows = {
  main: '0 5px 10px rgba(0,0,0,0.1)',
};

export const borderRadius = {
    s: '5px',
    m: '10px',
    l: '15px',
    xl: '30px',
}

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primary
        },
        secondary: {
            main: colors.secondary,
        },
        info: {
            main: colors.info,
        },
        background: {
            main: colors.white
        },
        divider:{
            main: '#EBF4FE'
        },
    },
    typography: {
        fontFamily: 'Raleway',
    }
});