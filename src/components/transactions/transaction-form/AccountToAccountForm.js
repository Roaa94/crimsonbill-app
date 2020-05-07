import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TransactionArrow from "./TransactionArrow";
import Select from "../../ui/inputs/Select";

const AccountToAccountForm = (
    {
        isSpending,
        onInputChange,
        formData,
        toEdit,
    }
) => {
    const {
        currentAccountValue,
        currentBalanceValue,
        targetAccountSelectValue,
        targetBalanceSelectValue,
        accountsList,
        balancesList
    } = formData;

    return (
        <Grid item xs={12} container alignItems='center' justify='center'>
            <Grid container item xs={12} md={5} spacing={2}>
                <Grid item xs={12} xl={6}>
                    <TextField
                        label={`${isSpending ? 'From' : 'To'} Account`}
                        disabled
                        value={currentAccountValue}
                    />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <TextField
                        label={`${isSpending ? 'From' : 'To'} Balance`}
                        disabled
                        value={currentBalanceValue}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} md justify='center'>
                <TransactionArrow isSpending={isSpending}/>
            </Grid>
            <Grid container item xs={12} md={5} spacing={2}>
                <Grid item xs={12} xl={6}>
                    <Select
                        label={`${isSpending ? 'To' : 'From'} Account`}
                        name='targetAccountId'
                        value={targetAccountSelectValue}
                        menuItems={accountsList}
                        onChange={(event) => onInputChange(event.target.name, event.target.value)}
                        disabled={toEdit}
                    />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Select
                        label={`${isSpending ? 'To' : 'From'} Balance`}
                        name='targetBalanceId'
                        disabled={!(!!targetAccountSelectValue) || toEdit}
                        value={targetBalanceSelectValue}
                        menuItems={balancesList}
                        onChange={(event) => onInputChange(event.target.name, event.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AccountToAccountForm;
