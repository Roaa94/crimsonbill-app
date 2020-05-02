import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAllBalancesTransactions} from "../../../redux/accounts/accounts.selectors";
import TransactionCard from "../transaction-card/TransactionCard";
import Scrollbar from "../../ui/Scrollbar";

class AllTransactionsList extends React.Component {

    render() {
        const {allTransactions, isAllTransactionsLoaded} = this.props;

        return (
            <div>
                <TransactionsListHeader all={true}>
                    <Grid container alignItems='center'>
                        All Account Transactions
                    </Grid>
                    <Grid container alignItems='center' justify='flex-end'>
                        filters
                    </Grid>
                </TransactionsListHeader>
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
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    allTransactions: selectAllBalancesTransactions(ownProps.accountId)(state),
    isAllTransactionsLoaded: !!selectAllBalancesTransactions(ownProps.accountId)(state),
});

export default connect(mapStateToProps)(AllTransactionsList);
