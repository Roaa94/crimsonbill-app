import React from 'react';
import {CustomButton} from "./Button.styles";
import {colors} from "../../../../styles/global";

const Button = ({
                    children,
                    textColor = colors.white,
                    bgColor = colors.primary,
                    height = 'auto',
                    fullWidth = true,
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
            fullWidth={fullWidth}
            textcolor={textColor}
            bgcolor={bgColor}
            height={height}
            startIcon={prefixIcon}
            endIcon={suffixIcon}
            justifycontent={justifyContent}
            alignitems={alignItems}
            disableElevation
            margin={margin}
            {...otherProps}
        >
            {children}
        </CustomButton>
    );
};

export default Button;
