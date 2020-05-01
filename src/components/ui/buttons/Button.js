import React from 'react';
import {borderRadius, boxShadows, colors} from "../../../styles/global";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiButton from "@material-ui/core/Button";

export const CustomButton = withStyles({
    root: {
        backgroundColor: props => props.bgcolor,
        color: props => props.textcolor,
        height: props => props.height,
        padding: props => props.size === 'small' ? '3px 10px' : '8px 20px',
        margin: props => props.margin,
        fontSize: props => props.size === 'small' ? '0.7rem' : '0.8rem',
        borderRadius: props => props.size === 'small' ? borderRadius.s : borderRadius.m,
        '&:hover': {
            backgroundColor: props => props.bgcolor,
            color: props => props.textcolor,
            boxShadow: boxShadows.main,
        }
    }
})(MuiButton);

const Button = ({
                    children,
                    textColor = colors.white,
                    bgColor = colors.text,
                    height = 'auto',
                    prefixIcon,
                    suffixIcon,
                    justifyContent = 'center',
                    alignItems = 'center',
                    margin = '0',
                    ...otherProps
                }) => {
    return (
        <CustomButton
            variant='contained'
            textcolor={textColor}
            bgcolor={bgColor}
            height={height}
            startIcon={prefixIcon}
            endIcon={suffixIcon}
            disableElevation
            margin={margin}
            {...otherProps}
        >
            {children}
        </CustomButton>
    );
};

export default Button;
