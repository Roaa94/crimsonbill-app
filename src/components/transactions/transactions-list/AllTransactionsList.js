import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAllBalancesTransactions} from "../../../redux/accounts/accounts.selectors";
import TransactionCard from "../transaction-card/TransactionCard";
import Scrollbar from "../../ui/Scrollbar";
import {ExpansionPanel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import withStyles from "@material-ui/core/styles/withStyles";

const TransactionsListExpansionPanelSummary = withStyles({
    root: {
        padding: 0,
    },
})(ExpansionPanelSummary)

class AllTransactionsList extends React.Component {

    render() {
        const {allTransactions, isAllTransactionsLoaded} = this.props;

        return (
            <ExpansionPanel>
                <TransactionsListExpansionPanelSummary>
                    <TransactionsListHeader all={true}>
                        <Grid container alignItems='center'>
                            All Account Transactions
                        </Grid>
                        <Grid container alignItems='center' justify='flex-end'>
                            filters
                        </Grid>
                    </TransactionsListHeader>
                </TransactionsListExpansionPanelSummary>
                {
                    isAllTransactionsLoaded ? (
                        <Scrollbar>
                            {
                                allTransactions.map(({id, ...transaction}) => (
                                    <TransactionCard
                                        key={id}
                                        readOnly={true}
                                        {...transaction}
                                    />
                                ))
                            }
                        </Scrollbar>
                    ) : null
                }
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    allTransactions: selectAllBalancesTransactions(ownProps.accountId)(state),
    isAllTransactionsLoaded: !!selectAllBalancesTransactions(ownProps.accountId)(state),
});

export default connect(mapStateToProps)(AllTransactionsList);
