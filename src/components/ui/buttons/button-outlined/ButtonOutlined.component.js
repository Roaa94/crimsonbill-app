import React from 'react';
import MuiButton from "@material-ui/core/Button";
import {useButtonOutlinedStyles} from "./ButtonOutlined.styles";

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