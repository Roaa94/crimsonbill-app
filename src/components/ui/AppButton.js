import React from 'react';
import Button from "@material-ui/core/Button";

const AppButton = ({onClick, children, color, ...otherProps}) => {
    return (
        <Button
            fullWidth={true}
            variant='contained'
            color={color ? color : 'primary'}
            onClick={onClick}
            disableElevation
            {...otherProps}
        >
            {children}
        </Button>
    );
};

export default AppButton;