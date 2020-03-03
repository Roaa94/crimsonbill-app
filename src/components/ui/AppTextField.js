import {Box, TextField, withStyles} from "@material-ui/core";
import React from 'react';

const CustomTextField = withStyles(theme => ({
    root: {
        background: theme.palette.background.main,
        '& label': {
            color: theme.palette.primary.main,
        },
        '& label.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.secondary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.secondary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main,
            },
        },
    }
}))(TextField);

const AppTextField = (props) => {
    return (
        <Box mb={2}>
            <CustomTextField
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