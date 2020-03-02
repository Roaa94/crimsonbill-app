import {Box, TextField, withStyles, withTheme} from "@material-ui/core";
import React from 'react';

const CustomTextField = withStyles(theme => {
    return {
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
                    borderWidth: '1.2px',
                    borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                    borderWidth: '1.2px',
                    borderColor: theme.palette.secondary.main,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main,
                },
            },
        }
    };
})(TextField);

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

export default withTheme(AppTextField);