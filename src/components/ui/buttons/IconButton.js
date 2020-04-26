import React from 'react';
import MuiButton from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {boxShadows} from "../../../styles/global";

const CustomIconButton = withStyles(() => ({
    root: {
        backgroundColor: props => props.bgcolor,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '100%',
        fontSize: '0.9rem',
        '&:hover': {
            boxShadow: boxShadows.main,
        }
    }
}))(MuiButton);

const IconButton = ({children, bgColor, color = 'primary', fullWidth = true, prefixIcon, suffixIcon, ...otherProps}) => {
    return (
        <CustomIconButton
            color={color}
            bgcolor={bgColor}
            fullWidth={fullWidth}
            startIcon={prefixIcon}
            endIcon={suffixIcon}
            disableElevation
            {...otherProps}
        >
            {children}
        </CustomIconButton>
    );
};

export default IconButton;
