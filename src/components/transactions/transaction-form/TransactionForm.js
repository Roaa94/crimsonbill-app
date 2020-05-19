import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TransactionTypeIcon from "../TransactionTypeIcon";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "../../ui/inputs/date-time-pickers/DateTimePicker";
import TransactionTypeAutoComplete from "./TransactionTypeAutocomplete";

const TransactionForm = (
    {
        typePickers,
        onInputChange,
        toEdit,
        values,
    }
) => {
    const {
        categoryId,
        sourceId,
        title,
        amount,
        dateTime,
        notes,
        type,
    } = values;

    return (
        <Box mb={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box fontWeight='600' fontSize='small'>
                        {toEdit ? 'Edit Transaction' : 'Add Transaction'}
                    </Box>
                </Grid>
                <Grid item container alignItems='stretch' wrap='nowrap' xs={12} md={7} xl={3}>
                    <Grid item>
                        <TransactionTypeIcon
                            type='spending'
                            checked={typePickers.spending}
                            onClick={() => onInputChange('type', 'spending')}
                        />
                    </Grid>
                    <Grid item>
                        <TransactionTypeIcon
                            type='earning'
                            checked={typePickers.earning}
                            onClick={() => onInputChange('type', 'earning')}
                        />
                    </Grid>
                    <Grid item xs>
                        <TransactionTypeAutoComplete
                            isSpending={type === 'spending'}
                            categoryId={categoryId}
                            sourceId={sourceId}
                            onInputChange={onInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} xl={2}>
                    <TextField
                        label='Title'
                        value={title}
                        name='title'
                        type='text'
                        required
                        onChange={(event) => onInputChange(event.target.name, event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={2} xl={1}>
                    <TextField
                        label='Amount'
                        value={amount}
                        name='amount'
                        type='text'
                        required
                        onChange={(event) => onInputChange(event.target.name, event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={10} xl={6}>
                    <DateTimePicker
                        selectedDate={dateTime}
                        dateFieldLabel='Transaction Date'
                        timeFieldLabel='Transaction Time'
                        onChange={(pickedDate) => onInputChange('dateTime', pickedDate)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Transaction Notes'
                        value={notes}
                        name='notes'
                        type='text'
                        multiline
                        rows={2}
                        onChange={(event) => onInputChange(event.target.name, event.target.value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TransactionForm;
