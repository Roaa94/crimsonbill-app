import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {
    addTransactionDocument,
    updateTransactionDocument
} from "../../../firebase/transactions.firebase-utils";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import TransactionForm from "./TransactionForm";
import {
    selectAccount,
    selectOtherAccounts,
} from "../../../redux/accounts/accounts.selectors";
import {TransactionFormWrapper} from "./TransactionForm.styles";
import {selectBalance, selectBalancesArray} from "../../../redux/balances/balances.selectors";
import {selectTransaction} from "../../../redux/transactions/transactions.selectors";

class TransactionFormContainer extends React.Component {
    defaultTransactionValues = {
        type: 'spending',
        categoryId: null,
        sourceId: null,
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
        const {transaction, balances} = this.props;

        if (transaction) {
            const parsedDateTime = new Date(transaction.dateTime.seconds * 1000);
            let {type, categoryId, sourceId, title, amount, accountToAccount, notes, targetAccountId, targetBalanceId} = transaction;
            if (this._isMounted) {
                this.setState({
                    defaultValues: {
                        dateTime: parsedDateTime,
                        type,
                        categoryId,
                        sourceId,
                        title,
                        amount,
                        accountToAccount,
                        notes,
                        targetAccountId,
                        targetBalanceId
                    },
                    typePickerValues: {
                        spending: transaction.type === 'spending',
                        earning: transaction.type === 'earning',
                    },
                    targetAccountBalances: accountToAccount ? balances.filter(balances => balances.accountId === targetAccountId) : '',
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
        if (transactionId && accountId && balanceId) {
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

    handleInputChange = (name, value) => {
        const {defaultValues} = this.state;

        this.setState({
            defaultValues: {
                ...defaultValues,
                [name]: value,
            }
        })

        if (name === 'targetAccountId') {
            const {balances} = this.props;
            this.setState({
                targetAccountBalances: balances.filter(balances => balances.accountId === value),
            })
        }
        if (name === 'type') {
            this.setState({
                typePickerValues: {
                    [value]: true,
                }
            })
        }
    }

    render() {
        const {typePickerValues, defaultValues, targetAccountBalances} = this.state;

        const {handleFormCancel, transactionId, account, balance, otherAccounts} = this.props;

        const accountToAccountData = {
            currentAccountValue: account.name,
            currentBalanceValue: balance.name,
            accountsList: otherAccounts,
            balancesList: targetAccountBalances,
        };

        return (
            <TransactionFormWrapper>
                <form onSubmit={this.handleFormSubmit}>
                    <TransactionForm
                        values={defaultValues}
                        typePickers={typePickerValues}
                        onInputChange={this.handleInputChange}
                        accountToAccountData={accountToAccountData}
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
            </TransactionFormWrapper>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    account: selectAccount(ownProps.accountId)(state),
    balance: selectBalance(ownProps.balanceId)(state),
    transaction: selectTransaction(ownProps.transactionId)(state),
    otherAccounts: selectOtherAccounts(ownProps.accountId)(state),
    balances: selectBalancesArray(state),
});

export default connect(mapStateToProps)(TransactionFormContainer);
