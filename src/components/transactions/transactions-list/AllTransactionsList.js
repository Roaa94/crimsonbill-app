import React from 'react';
import {TransactionCardsList, TransactionsListExpansionPanelSummary} from "./TransactionsList.styles";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import TransactionCard from "../transaction-card/TransactionCard";
import {ExpansionPanel} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    selectHasTransactions,
    selectIsFetchingTransactions,
    selectTransactionsArray
} from "../../../redux/transactions/transactions.selectors";

class AllTransactionsList extends React.Component {

    render() {
        const {transactions, isFetchingTransactions, hasTransactions} = this.props;

        return (
            <ExpansionPanel defaultExpanded>
                <TransactionsListExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    All Balances Transactions
                </TransactionsListExpansionPanelSummary>
                {
                    !isFetchingTransactions && hasTransactions ? (
                        <TransactionCardsList>
                            {
                                transactions.map(transaction => (
                                    <TransactionCard
                                        key={transaction.id}
                                        readOnly={true}
                                        transaction={transaction}
                                    />
                                ))
                            }
                        </TransactionCardsList>
                    ) : null
                }
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: selectUserId(state),
    isFetchingTransactions: selectIsFetchingTransactions(state),
    hasTransactions: selectHasTransactions(state),
    transactions: selectTransactionsArray(state),
});

export default connect(mapStateToProps)(AllTransactionsList);
