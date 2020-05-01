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
import {addOrUpdateTransactionDocument} from "../../../firebase/transactions.firebase-utils";
import {createStructuredSelector} from "reselect";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";

class TransactionForm extends React.Component {
    defaultTransactionValues = {
        type: 'spending',
        category: '',
        amount: '',
        dateTime: new Date(),
        accountToAccount: false,
        sourceAccountId: '',
        destinationAccountId: '',
        notes: '',
    };

    typePicker = {
        spending: true,
        earning: false,
    };

    state = {
        defaultValues: this.defaultTransactionValues,
        typePicker: this.typePicker,
    };

    handleFormSubmit = async event => {
        event.preventDefault();
        let {handleFormCancel, userId, accountId, transactionId, balanceId} = this.props;
        const transactionData = this.state.defaultValues;
        await addOrUpdateTransactionDocument(userId, accountId, balanceId, transactionId, transactionData);
        this.setState({
            defaultValues: this.defaultTransactionValues,
            typePicker: this.typePicker,
        });
        handleFormCancel();
    }

    handleFieldChange = event => {
        const {defaultValues} = this.state;
        const {name, value} = event.target;
        this.setState({
            defaultValues: {
                ...defaultValues,
                [name]: value
            },
        });
    };

    handleTypePickerChange = value => {
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                type: value,
            },
            typePicker: {
                [value]: true,
            }
        })
    };

    handleDateChange = pickedDate => {
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                date: pickedDate,
            }
        });
    }

    handleCheckBoxChange = event => {
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                accountToAccount: event.target.checked,
            }
        })
    }

    render() {
        const {typePicker, defaultValues} = this.state;
        const {category, amount, dateTime, accountToAccount, notes, type} = defaultValues;
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
                                required
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
                                            value={category}
                                            menuItems={categories}
                                            onChange={this.handleFieldChange}
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
                        bgColor={colors.secondary}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 20px 0'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.primary}
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

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
});

export default connect(mapStateToProps)(TransactionForm);
