import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";
import TransactionForm from "../transaction-form/TransactionForm";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {selectBalanceTransactions} from "../../../redux/accounts/accounts.selectors";
import TransactionCard from "../transaction-card/TransactionCard";
import Scrollbar from "../../ui/Scrollbar";

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
        if(this._isMount) {
            this.setState({showTransactionForm: value});
        }
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
                            handleClick={() => this.controlTransactionForm(true)}
                        />
                    </Grid>
                    <Grid container alignItems='center' justify='flex-end'>
                        filters
                    </Grid>
                </TransactionsListHeader>
                {
                    showTransactionForm ? (
                        <TransactionForm
                            handleFormCancel={() => this.controlTransactionForm(false)}
                            accountId={accountId}
                            balanceId={balanceId}
                        />
                    ) : null
                }
                {
                    isTransactionsLoaded ? (
                        <Scrollbar>
                            {
                                transactions.map((transaction) => (
                                    <TransactionCard
                                        key={transaction.id}
                                        accountId={accountId}
                                        balanceId={balanceId}
                                        transaction={transaction}
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
    transactions: selectBalanceTransactions(ownProps.accountId, ownProps.balanceId)(state),
    isTransactionsLoaded: !!selectBalanceTransactions(ownProps.accountId, ownProps.balanceId)(state),
});

export default connect(mapStateToProps)(TransactionsList);
