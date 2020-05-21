import React from 'react';
import {selectTransactionsByType} from "../../../redux/transactions/transactions.selectors";
import {connect} from "react-redux";
import LatestTransactionListItem from "./LatestTransactionListItem";
import {
    LatestTransactionsListHeader,
    LatestTransactionsListContainer,
    LatestTransactionsListContent
} from "./LatestTransactions.styles";

const LatestTransactionsList = ({transactions, type}) => {
    return (
        <LatestTransactionsListContainer>
            <LatestTransactionsListHeader isSpending={type === 'spending'}>
                <div>
                    {
                        type === 'spending' ? 'Latest Spendings' : 'Latest Earnings'
                    }
                </div>
            </LatestTransactionsListHeader>
            <LatestTransactionsListContent>
                {
                    transactions.map(transaction => (
                        <LatestTransactionListItem
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))
                }
            </LatestTransactionsListContent>
        </LatestTransactionsListContainer>
    );
};

const mapStateToProps = (state, ownProps) => ({
    transactions: selectTransactionsByType(ownProps.type)(state),
});

export default connect(mapStateToProps)(LatestTransactionsList);
