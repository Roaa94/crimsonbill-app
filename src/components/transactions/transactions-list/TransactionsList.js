import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";
import TransactionForm from "../transaction-form/TransactionForm";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectAccountTransactions} from "../../../redux/accounts/accounts.selectors";
import TransactionCard from "../transaction-card/TransactionCard";
import Scrollbar from "../../ui/Scrollbar";

class TransactionsList extends React.Component {
    state = {
        showTransactionForm: false,
    };

    render() {
        const {showTransactionForm} = this.state;
        const {accountId, balanceId, transactions, isTransactionsLoaded} = this.props;

        return (
            <div>
                <TransactionsListHeader>
                    <Grid container alignItems='center'>
                        Transactions
                        <AddIconButton
                            bgColor={colors.background}
                            size='small'
                            handleClick={() => this.setState({showTransactionForm: true})}
                        />
                    </Grid>
                    <Grid container alignItems='center' justify='flex-end'>
                        filters
                    </Grid>
                </TransactionsListHeader>
                {
                    showTransactionForm ? (
                        <TransactionForm
                            handleFormCancel={() => this.setState({showTransactionForm: false})}
                            accountId={accountId}
                            balanceId={balanceId}
                        />
                    ) : null
                }
                {
                    isTransactionsLoaded ? (
                        <Scrollbar>
                            {
                                transactions.map(({id, ...transaction}) => (
                                    <TransactionCard
                                        key={id}
                                        accountId={accountId}
                                        balanceId={balanceId}
                                        transactionId={id}
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
    transactions: selectAccountTransactions(ownProps.accountId, ownProps.balanceId)(state),
    isTransactionsLoaded: !!selectAccountTransactions(ownProps.accountId, ownProps.balanceId)(state),
});

export default connect(mapStateToProps)(TransactionsList);
