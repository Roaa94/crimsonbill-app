import React from 'react';
import Button from "@material-ui/core/Button";

const AppButton = ({onClick, children, color}) => {
    return (
        <Button
            fullWidth={true}
            type='submit'
            variant='contained'
            color={color ? color : 'primary'}
            onClick={onClick}
            disableElevation
        >
            {children}
        </Button>
    );
};

export default AppButton;