import React from 'react';
import MuiButton from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
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

const Button = ({children, color, fullWidth = true, ...otherProps}) => {
    const classes = useStyles();
    return (
        <MuiButton
            className={color === 'secondary' ? classes.secondary : classes.primary}
            variant='contained'
            color={color ? color : 'primary'}
            disableElevation
            fullWidth={fullWidth}
            {...otherProps}
        >
            {children}
        </MuiButton>
    );
};

export default Button;