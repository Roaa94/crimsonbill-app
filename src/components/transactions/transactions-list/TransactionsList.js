import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";
import TransactionForm from "../transaction-form/TransactionForm";

class TransactionsList extends React.Component {
    state = {
        showTransactionForm: true,
    };

    render() {
        const {showTransactionForm} = this.state;

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
                        />
                    ) : null
                }
            </div>
        );
    }
}

export default TransactionsList;
