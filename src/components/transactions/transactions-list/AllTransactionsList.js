import React from 'react';
import {TransactionCardsList, TransactionsListExpansionPanelSummary} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAllAccountTransactions} from "../../../redux/accounts/accounts.selectors";
import TransactionCard from "../transaction-card/TransactionCard";
import {ExpansionPanel} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class AllTransactionsList extends React.Component {

    render() {
        const {allTransactions, isAllTransactionsLoaded} = this.props;

        return (
            <ExpansionPanel>
                <TransactionsListExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container alignItems='center'>
                        <Grid item xs container alignItems='center'>
                            All Account Transactions
                        </Grid>
                        <Grid item xs container alignItems='center' justify='flex-end'>
                            filters
                        </Grid>
                    </Grid>
                </TransactionsListExpansionPanelSummary>
                {
                    isAllTransactionsLoaded ? (
                        <TransactionCardsList>
                            {
                                allTransactions.map(transaction => (
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

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    allTransactions: selectAllAccountTransactions(ownProps.accountId)(state),
    isAllTransactionsLoaded: !!selectAllAccountTransactions(ownProps.accountId)(state),
});

export default connect(mapStateToProps)(AllTransactionsList);
