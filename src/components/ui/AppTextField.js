import {Box, TextField} from "@material-ui/core";
import React from 'react';

const AppTextField = (props) => {
    return (
        <Box mb={2}>
            <TextField
                variant='outlined'
                fullWidth={true}
                margin='dense'
                color='secondary'
                {...props}
            />
        </Box>
    );
};

export default AppTextField;