import React from 'react';
import Button from "@material-ui/core/Button";

const AppButton = ({onChange, children, color}) => {
    return (
        <Button
            fullWidth={true}
            variant='contained'
            color={color ? color : 'primary'}
            onChange={onChange}
            disableElevation
        >
            {children}
        </Button>
    );
};

export default AppButton;