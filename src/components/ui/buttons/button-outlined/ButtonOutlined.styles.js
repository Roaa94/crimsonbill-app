import makeStyles from "@material-ui/core/styles/makeStyles";

export const useButtonOutlinedStyles = makeStyles(theme => ({
    primary: {
        border: `1px solid transparent`,
        '&:hover': {
            backgroundColor: '#ffff',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
        }
    },
    secondary: {
        border: `1px solid transparent`,
        '&:hover': {
            backgroundColor: '#ffff',
            color: theme.palette.secondary.main,
            border: `1px solid ${theme.palette.secondary.main}`,
        }
    }

}));