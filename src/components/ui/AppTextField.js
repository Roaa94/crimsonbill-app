import {Box, TextField} from "@material-ui/core";
import React from 'react';

const AppTextField = ({type, label, onChange, name, value, required}) => {
    return (
        <Box mb={2}>
            <TextField
                type={type}
                label={label}
                onChange={onChange}
                name={name}
                variant='outlined'
                fullWidth={true}
                margin='dense'
                color='secondary'
                value={value}
                required={required}
            />
        </Box>
    );
};

export default AppTextField;