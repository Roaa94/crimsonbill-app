import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TransactionTypeIcon from "../TransactionTypeIcon";
import Icon from "@material-ui/core/Icon";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import Select from "../../ui/inputs/Select";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "../../ui/inputs/date-time-pickers/DateTimePicker";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const TransactionFormLayout = (
    {
        formTitle,
        typePickers,
        onSelectType,
        categorySelectValue,
        categorySelectItems,
        amountValue,
        dateTimeValue,
        accountToAccount,
        onCheckboxChange,
        fromAccountSelectValue,
        toAccountSelectValue,
        type,
        notesValue,
        onFieldChange,
        onDateTimeChange,
        accountList
    }
) => {
    return (
        <Box mb={2}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box fontWeight='600' fontSize='small'>
                        {formTitle}
                    </Box>
                </Grid>
                <Grid item container alignItems='stretch' wrap='nowrap' xs={12} md={7} xl={4}>
                    <Grid item>
                        <TransactionTypeIcon
                            type='spending'
                            checked={typePickers.spending}
                            onClick={() => onSelectType('spending')}
                        />
                    </Grid>
                    <Grid item>
                        <TransactionTypeIcon
                            type='earning'
                            checked={typePickers.earning}
                            onClick={() => onSelectType('earning')}
                        />
                    </Grid>
                    <Grid item xs>
                        <Select
                            label='Category'
                            name='category'
                            value={categorySelectValue}
                            menuItems={categorySelectItems}
                            onChange={onFieldChange}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} xl={2}>
                    <TextField
                        label='Amount'
                        value={amountValue}
                        name='amount'
                        type='text'
                        required
                        onChange={onFieldChange}
                    />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <DateTimePicker
                        selectedDate={dateTimeValue}
                        dateFieldLabel='Transaction Date'
                        timeFieldLabel='Transaction Time'
                        onChange={onDateTimeChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={accountToAccount}
                                onChange={onCheckboxChange}
                                name="accountToAccount"
                                color={type === 'spending' ? 'primary' : 'secondary'}
                            />
                        }
                        label="Account to Account Transaction"
                    />
                </Grid>
                {
                    accountToAccount ? (
                        <Grid item xs={12} container alignItems='center' justify='space-between'>
                            <Grid item xs={12} md={5}>
                                <Select
                                    label='From Account'
                                    name='category'
                                    value={fromAccountSelectValue}
                                    menuItems={accountList}
                                    onChange={onFieldChange}
                                />
                            </Grid>
                            <Grid container item xs={12} md justify='center'>
                                <Icon
                                    color={type === 'spending' ? 'primary' : 'secondary'}
                                    fontSize='large'
                                >
                                    <DoubleArrowRoundedIcon/>
                                </Icon>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Select
                                    label='To Account'
                                    name='category'
                                    value={toAccountSelectValue}
                                    menuItems={accountList}
                                    onChange={onFieldChange}
                                />
                            </Grid>
                        </Grid>
                    ) : null
                }
                <Grid item xs={12}>
                    <TextField
                        label='Transaction Notes'
                        value={notesValue}
                        name='notes'
                        type='text'
                        multiline
                        rows={2}
                        onChange={onFieldChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TransactionFormLayout;
