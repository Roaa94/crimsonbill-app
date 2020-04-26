import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiTextField from "@material-ui/core/TextField";
import {borderRadius, colors} from "../../../../styles/global";

const CustomFilledTextField = withStyles(theme => ({
    root: {
        '& label': {
            color: theme.palette.primary.main,
            fontSize: '0.9rem',
        },
        '& label.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiInputLabel-shrink': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFilledInput-underline:before': {
            display: 'none',
        },
        '& .MuiFilledInput-underline:after': {
            display: 'none',
        },
        '& .MuiFilledInput-root': {
            border: 'none',
            borderRadius: borderRadius.m,
            background: colors.background,
        },
    }
}))(MuiTextField);

const TextFieldFilled = (props) => {
    return (
        <CustomFilledTextField
            variant='filled'
            fullWidth={true}
            {...props}
        />
    );
};

export default TextFieldFilled;
