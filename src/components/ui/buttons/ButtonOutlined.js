import React from 'react';
import MuiButton from "@material-ui/core/Button";
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

const ButtonOutlined = ({children, color, fullWidth = true, ...otherProps}) => {
    const classes = useButtonOutlinedStyles();
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

export default ButtonOutlined;