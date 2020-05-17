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
    selectBalance,
    selectOtherAccounts,
    selectTransaction
} from "../../../redux/accounts/accounts.selectors";
import {TransactionFormWrapper} from "./TransactionForm.styles";
import {selectTaxonomyArray} from "../../../redux/taxonomies/taxonomies.selectors";

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
        const {transactionId, transaction, otherAccounts} = this.props;

        if (transaction && transactionId) {
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
        // const {defaultValues} = this.state;
        // const transactionData = {
        //     currencyCode: balance.currencyCode,
        //     ...defaultValues,
        // };
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

    handleInputChange = (name, value) => {
        const {defaultValues} = this.state;

        this.setState({
            defaultValues: {
                ...defaultValues,
                [name]: value,
            }
        })

        if (name === 'targetAccountId') {
            const {otherAccounts} = this.props;
            this.setState({
                targetAccountBalances: otherAccounts.find(account => account.id === value).balances,
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

        const {handleFormCancel, transactionId, account, balance, otherAccounts, spendingCategories, incomeSources} = this.props;

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
                        categorySelectItems={spendingCategories}
                        sourcesSelectItems={incomeSources}
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
    balance: selectBalance(ownProps.accountId, ownProps.balanceId)(state),
    transaction: selectTransaction(ownProps.accountId, ownProps.balanceId, ownProps.transactionId)(state),
    otherAccounts: selectOtherAccounts(ownProps.accountId)(state),
    spendingCategories: selectTaxonomyArray('spendingCategories')(state),
    incomeSources: selectTaxonomyArray('incomeSources')(state),
});

export default connect(mapStateToProps)(TransactionFormContainer);
