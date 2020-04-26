import React from 'react';
import MuiTextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

const CustomOutlinedTextField = withStyles(theme => ({
    root: {
        background: theme.palette.background.main,
        '& label': {
            color: theme.palette.primary.main,
        },
        '& label.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiInputLabel-shrink': {
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
}))(MuiTextField);

const TextFieldOutlined = (props) => {
    return (
        <Box mb={2}>
            <CustomOutlinedTextField
                variant='outlined'
                fullWidth={true}
                margin='dense'
                color='secondary'
                {...props}
            />
        </Box>
    );
};

export default TextFieldOutlined;