import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker, KeyboardDatePicker,
} from '@material-ui/pickers';
import withStyles from "@material-ui/core/styles/withStyles";
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import Grid from "@material-ui/core/Grid";

const CustomTimePicker = withStyles(theme => ({
    root: {
        '& .MuiInputLabel-shrink': {
            color: theme.palette.secondary.main,
        },
    }
}))(KeyboardTimePicker);

const CustomDatePicker = withStyles(theme => ({
    root: {
        '& .MuiInputLabel-shrink': {
            color: theme.palette.secondary.main,
        },
    }
}))(KeyboardDatePicker);

const DateTimePicker = ({selectedDate, onChange, dateFieldLabel, timeFieldLabel}) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2}>
                <Grid item xs={12} md>
                    <CustomDatePicker
                        disableToolbar
                        autoOk
                        variant="inline"
                        inputVariant='filled'
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label={dateFieldLabel}
                        value={selectedDate}
                        onChange={onChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md>
                    <CustomTimePicker
                        variant="inline"
                        inputVariant='filled'
                        margin="normal"
                        id="time-picker"
                        label={timeFieldLabel}
                        value={selectedDate}
                        keyboardIcon={<ScheduleRoundedIcon/>}
                        onChange={onChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

export default DateTimePicker;
