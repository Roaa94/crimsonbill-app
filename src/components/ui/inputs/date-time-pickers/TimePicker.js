import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import withStyles from "@material-ui/core/styles/withStyles";
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';

const CustomTimePicker = withStyles(theme => ({
    root: {
        '& .MuiInputLabel-shrink': {
            color: theme.palette.secondary.main,
        },
    }
}))(KeyboardTimePicker);

const TimePicker = ({selectedTime, onChange, label}) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CustomTimePicker
                variant="inline"
                inputVariant='filled'
                margin="normal"
                id="time-picker"
                label={label}
                value={selectedTime}
                keyboardIcon={<ScheduleRoundedIcon/>}
                onChange={onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default TimePicker;
