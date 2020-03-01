import React from 'react';
import Button from "@material-ui/core/Button";

const AppButton = ({children, color, fullWidth = true, ...otherProps}) => {
    return (
        <Button
            variant='contained'
            color={color ? color : 'primary'}
            disableElevation
            fullWidth={!!fullWidth}
            {...otherProps}
        >
            {children}
        </Button>
    );
};

export default AppButton;