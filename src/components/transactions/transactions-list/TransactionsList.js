import React from 'react';
import {TransactionCardsList, TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";
import TransactionFormContainer from "../transaction-form/TransactionFormContainer";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import TransactionCard from "../transaction-card/TransactionCard";
import {
    selectBalanceHasTransactions,
    selectBalanceTransactions,
    selectIsFetchingTransactions
} from "../../../redux/transactions/transactions.selectors";

class TransactionsList extends React.Component {

    _isMount = false;

    componentDidMount() {
        this._isMount = true;
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    state = {
        showTransactionForm: false,
    };

    controlTransactionForm = value => {
        if (this._isMount) {
            this.setState({showTransactionForm: value});
        }
    }

    render() {
        const {showTransactionForm} = this.state;
        const {accountId, balanceId, transactions, isFetchingTransactions, balanceHasTransactions} = this.props;

        return (
            <div>
                <TransactionsListHeader>
                    Transactions
                    <AddIconButton
                        bgColor={colors.background}
                        size='small'
                        handleClick={() => this.controlTransactionForm(true)}
                    />
                </TransactionsListHeader>
                {
                    showTransactionForm ? (
                        <TransactionFormContainer
                            handleFormCancel={() => this.controlTransactionForm(false)}
                            accountId={accountId}
                            balanceId={balanceId}
                        />
                    ) : null
                }
                {
                    !isFetchingTransactions && balanceHasTransactions ? (
                        <TransactionCardsList>
                            {
                                transactions.map((transaction) => (
                                    <TransactionCard
                                        key={transaction.id}
                                        balanceId={balanceId}
                                        transaction={transaction}
                                    />
                                ))
                            }
                        </TransactionCardsList>
                    ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    transactions: selectBalanceTransactions(ownProps.balanceId)(state),
    isFetchingTransactions: selectIsFetchingTransactions(state),
    balanceHasTransactions: selectBalanceHasTransactions(ownProps.balanceId)(state),
});

export default connect(mapStateToProps)(TransactionsList);
