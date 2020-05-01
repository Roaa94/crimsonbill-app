import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import withStyles from "@material-ui/core/styles/withStyles";

const CustomDatePicker = withStyles(theme => ({
    root: {
        '& .MuiInputLabel-shrink': {
            color: theme.palette.primary.main,
        },
    }
}))(KeyboardDatePicker);

const DatePicker = ({selectedDate, onChange, label}) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CustomDatePicker
                disableToolbar
                autoOk
                variant="inline"
                inputVariant='filled'
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={label}
                value={selectedDate}
                onChange={onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;
