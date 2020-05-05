import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {categories} from "../../../data";
import {
    addTransactionDocument,
    updateTransactionDocument
} from "../../../firebase/transactions.firebase-utils";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import TransactionFormLayout from "./TransactionFormLayout";
import {
    selectAccount,
    selectBalance,
    selectOtherAccounts,
    selectTransaction
} from "../../../redux/accounts/accounts.selectors";
import {TransactionFormContainer} from "./TransactionForm.styles";

class TransactionForm extends React.Component {
    defaultTransactionValues = {
        type: 'spending',
        category: '',
        title: '',
        amount: '',
        dateTime: new Date(),
        accountToAccount: false,
        targetAccountId: '',
        targetBalanceId: '',
        notes: '',
    };

    typePickerValues = {
        spending: true,
        earning: false,
    };

    state = {
        defaultValues: this.defaultTransactionValues,
        typePickerValues: this.typePickerValues,
        targetAccountBalances: [],
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const {transactionId, transaction, otherAccounts} = this.props;

        if (transaction && transactionId) {
            const parsedDateTime = new Date(transaction.dateTime.seconds * 1000);
            let {type, category, title, amount, accountToAccount, notes, targetAccountId, targetBalanceId} = transaction;
            if (this._isMounted) {
                this.setState({
                    defaultValues: {
                        dateTime: parsedDateTime,
                        type, category, title, amount, accountToAccount, notes, targetAccountId, targetBalanceId
                    },
                    typePickerValues: {
                        spending: transaction.type === 'spending',
                        earning: transaction.type === 'earning',
                    },
                    targetAccountBalances: accountToAccount ? otherAccounts.find(account => account.id === targetAccountId).balances : '',
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {handleFormCancel, userId, accountId, transactionId, balanceId} = this.props;
        const transactionData = this.state.defaultValues;
        if (transactionId) {
            await updateTransactionDocument(userId, accountId, balanceId, transactionId, transactionData);
        } else {
            await addTransactionDocument(userId, accountId, balanceId, transactionData);
        }
        if (this._isMounted) {
            this.setState({
                defaultValues: this.defaultTransactionValues,
                typePickerValues: this.typePickerValues,
            });
        }
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
        if (name === 'targetAccountId') {
            const {otherAccounts} = this.props;
            this.setState({
                targetAccountBalances: otherAccounts.find(account => account.id === value).balances,
            })
        }
    };

    handleTypePickerChange = value => {
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                type: value,
            },
            typePickerValues: {
                [value]: true,
            }
        })
    };

    handleDateTimeChange = pickedDate => {
        console.log(pickedDate);
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                dateTime: pickedDate,
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
        const {typePickerValues, defaultValues, targetAccountBalances} = this.state;

        const {
            category,
            title,
            amount,
            dateTime,
            accountToAccount,
            notes,
            type,
            targetAccountId,
            targetBalanceId
        } = defaultValues;
        const {handleFormCancel, transactionId, account, balance, otherAccounts} = this.props;
        // console.log(defaultValues);

        return (
            <TransactionFormContainer>
                <form onSubmit={this.handleFormSubmit}>
                    <TransactionFormLayout
                        typePickers={typePickerValues}
                        onSelectType={this.handleTypePickerChange}
                        onFieldChange={this.handleFieldChange}
                        categorySelectValue={category}
                        categorySelectItems={categories}
                        titleValue={title}
                        amountValue={amount}
                        dateTimeValue={dateTime}
                        onDateTimeChange={this.handleDateTimeChange}
                        accountToAccount={accountToAccount}
                        onCheckboxChange={this.handleCheckBoxChange}
                        type={type}
                        currentAccountValue={account.name}
                        currentBalanceValue={balance.name}
                        targetAccountSelectValue={targetAccountId}
                        targetBalanceSelectValue={targetBalanceId}
                        accountsList={otherAccounts}
                        balancesList={targetAccountBalances}
                        notesValue={notes}
                        toEdit={!!transactionId}
                    />
                    <Grid container>
                        <Button
                            fullWidth={false}
                            type='submit'
                            bgColor={colors.secondary}
                            prefixIcon={<CheckRoundedIcon/>}
                            margin='0 20px 0 0'
                        >
                            Submit
                        </Button>
                        <Button
                            bgColor={colors.primary}
                            fullWidth={false}
                            onClick={handleFormCancel}
                            prefixIcon={<ClearRoundedIcon/>}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </form>
            </TransactionFormContainer>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    account: selectAccount(ownProps.accountId)(state),
    balance: selectBalance(ownProps.accountId, ownProps.balanceId)(state),
    transaction: selectTransaction(ownProps.accountId, ownProps.balanceId, ownProps.transactionId)(state),
    otherAccounts: selectOtherAccounts(ownProps.accountId)(state),
});

export default connect(mapStateToProps)(TransactionForm);
