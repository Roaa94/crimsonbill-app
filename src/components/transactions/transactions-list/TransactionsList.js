import React from 'react';
import {TransactionsListHeader} from "./TransactionsList.styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";

class TransactionsList extends React.Component {
    state = {
        showTransactionForm: false,
    };

    render() {
        return (
            <div>
                <TransactionsListHeader>
                    <Grid container alignItems='center'>
                        Transactions
                        <AddIconButton
                            bgColor={colors.background}
                            size='small'
                            onClick={() => this.setState({showTransactionForm: true})}
                        />
                    </Grid>
                    <Grid container alignItems='center' justify='flex-end'>
                        filters
                    </Grid>
                </TransactionsListHeader>
            </div>
        );
    }
}

export default TransactionsList;
