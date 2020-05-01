import React from 'react';
import Grid from "@material-ui/core/Grid";
import TransactionTypeIcon from "../TransactionTypeIcon";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {categories} from "../../../data";
import Select from "../../ui/inputs/Select";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateTimePicker from "../../ui/inputs/date-time-pickers/DateTimePicker";
import Icon from "@material-ui/core/Icon";
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';

class TransactionForm extends React.Component {
    defaultValues = {
        type: '',
        category: '',
        amount: 0.0,
        dateTime: new Date(),
        accountToAccount: true,
        sourceAccountId: '',
        destinationAccountId: '',
        notes: '',
        typePicker: {
            spending: true,
            earning: false,
        }
    };

    state = this.defaultValues;

    handleFormSubmit = async event => {
        event.preventDefault();
        let {handleFormCancel} = this.props;
        this.setState(this.defaultValues);
        handleFormCancel();
    }

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleTypePickerChange = value => {
        this.setState({
            type: value,
            typePicker: {
                [value]: true,
            }
        })
    };

    handleDateChange = pickedDate => {
        this.setState({
            dateTime: pickedDate,
        })
    }

    handleCheckBoxChange = event => {
        this.setState({accountToAccount: event.target.checked});
    }

    render() {
        const {typePicker, category, amount, dateTime, accountToAccount, notes} = this.state;
        const {handleFormCancel} = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box fontWeight='600' fontSize='small'>
                                Add Transaction
                            </Box>
                        </Grid>
                        <Grid item container alignItems='stretch' wrap='nowrap' xs={12} md={7} xl={4}>
                            <Grid item>
                                <TransactionTypeIcon
                                    type='spending'
                                    checked={typePicker.spending}
                                    onClick={() => this.handleTypePickerChange('spending')}
                                />
                            </Grid>
                            <Grid item>
                                <TransactionTypeIcon
                                    type='earning'
                                    checked={typePicker.earning}
                                    onClick={() => this.handleTypePickerChange('earning')}
                                />
                            </Grid>
                            <Grid item xs>
                                <Select
                                    label='Category'
                                    name='category'
                                    value={category}
                                    menuItems={categories}
                                    onChange={this.handleFieldChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} xl={2}>
                            <TextField
                                label='Amount'
                                value={amount}
                                name='amount'
                                type='text'
                                onChange={this.handleFieldChange}
                            />
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <DateTimePicker
                                selectedDate={dateTime}
                                dateFieldLabel='Transaction Date'
                                timeFieldLabel='Transaction Time'
                                onChange={this.handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={accountToAccount}
                                        onChange={this.handleCheckBoxChange}
                                        name="accountToAccount"
                                        color='secondary'
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
                                            value={category}
                                            menuItems={categories}
                                            onChange={this.handleFieldChange}
                                        />
                                    </Grid>
                                    <Grid container item xs={12} md justify='center'>
                                        <Icon color='secondary' fontSize='large'>
                                            <DoubleArrowRoundedIcon/>
                                        </Icon>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Select
                                            label='To Account'
                                            name='category'
                                            value={category}
                                            menuItems={categories}
                                            onChange={this.handleFieldChange}
                                        />
                                    </Grid>
                                </Grid>
                            ) : null
                        }
                        <Grid item xs={12}>
                            <TextField
                                label='Transaction Notes'
                                value={notes}
                                name='notes'
                                type='text'
                                multiline
                                rows={2}
                                onChange={this.handleFieldChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container>
                    <Button
                        fullWidth={false}
                        type='submit'
                        bgColor={colors.info}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 20px 0'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.secondary}
                        fullWidth={false}
                        onClick={handleFormCancel}
                        prefixIcon={<ClearRoundedIcon/>}
                        margin='0 0 20px 0'
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default TransactionForm;
