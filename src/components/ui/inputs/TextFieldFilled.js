import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiTextField from "@material-ui/core/TextField";
import {colors} from "../../../styles/global";

const CustomFilledTextField = withStyles(theme => ({
    root: {
        '& label': {
            color: theme.palette.primary.main,
            fontSize: '0.9rem',
        },
        '& .MuiFilledInput-underline:before': {
            display: 'none',
        },
        '& .MuiFilledInput-underline:after': {
            display: 'none',
        },
        '& .MuiFilledInput-root': {
            border: 'none',
            borderRadius: '10px',
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
