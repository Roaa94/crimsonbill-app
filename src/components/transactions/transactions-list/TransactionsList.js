import React from 'react';
import {TransactionCardsList, TransactionsListHeader} from "./TransactionsList.styles";
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

const TransactionsList = ({accountId, balanceId, transactions, isFetchingTransactions, balanceHasTransactions}) => {

    const [showTransactionForm, setTransactionForm] = React.useState(false);

    return (
        <React.Fragment>
            <TransactionsListHeader>
                Transactions
                <AddIconButton
                    bgColor={colors.background}
                    size='small'
                    handleClick={() => setTransactionForm(true)}
                />
            </TransactionsListHeader>
            {
                showTransactionForm ? (
                    <TransactionFormContainer
                        handleFormCancel={() => setTransactionForm(false)}
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
        </React.Fragment>
    );
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    transactions: selectBalanceTransactions(ownProps.balanceId)(state),
    isFetchingTransactions: selectIsFetchingTransactions(state),
    balanceHasTransactions: selectBalanceHasTransactions(ownProps.balanceId)(state),
});

export default connect(mapStateToProps)(TransactionsList);
