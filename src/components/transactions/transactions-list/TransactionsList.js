import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";
import TransactionForm from "../transaction-form/TransactionForm";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {fetchTransactionsStartAsync} from "../../../redux/accounts/accounts.actions";
import {selectAccountTransactions} from "../../../redux/accounts/accounts.selectors";

class TransactionsList extends React.Component {
    state = {
        showTransactionForm: false,
    };

    componentDidMount() {
        const {fetchTransactionsStartAsync, userId, accountId, balanceId} = this.props;
        fetchTransactionsStartAsync(userId, accountId, balanceId);
    }

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
                    isTransactionsLoaded ?
                        (
                            transactions.map(({id, amount}) => (
                                <div key={id}>{amount}</div>
                            ))
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

const mapDispatchToProps = dispatch => ({
    fetchTransactionsStartAsync: (userId, accountId, balanceId) => dispatch(fetchTransactionsStartAsync(userId, accountId, balanceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
