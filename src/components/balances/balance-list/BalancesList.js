import React from 'react';
import Box from "@material-ui/core/Box";
import AddIconButton from "../../ui/buttons/AddIconButton";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {BalanceListHeader} from "./BalancesList.styles";
import BalanceCard from "../balance-card/BalanceCard";
import BalanceForm from "../BalanceForm";
import {colors} from "../../../styles/global";
import AllTransactionsList from "../../transactions/transactions-list/AllTransactionsList";
import {
    selectAccountBalances,
    selectAccountHasBalances,
    selectIsFetchingBalances
} from "../../../redux/balances/balances.selectors";

class BalancesList extends React.Component {
    state = {
        showBalanceForm: false,
    };

    render() {
        let {accountId, balances, accountHasBalances, isFetchingBalances} = this.props;
        let {showBalanceForm} = this.state;

        return (
            <div>
                {
                    !isFetchingBalances && accountHasBalances && balances.length > 1
                        ? (
                            <Box mb={2}>
                                <AllTransactionsList accountId={accountId}/>
                            </Box>
                        ) : null
                }
                <Box display='flex' alignItems='center' mb={1}>
                    <h4>Balances</h4>
                    <AddIconButton
                        bgColor={colors.background}
                        size='small'
                        handleClick={() => this.setState({showBalanceForm: true})}
                    />
                </Box>
                {
                    showBalanceForm ? (
                        <BalanceForm
                            accountId={accountId}
                            handleFormCancel={() => this.setState({showBalanceForm: false})}
                        />
                    ) : null
                }
                {
                    !isFetchingBalances && accountHasBalances
                        ? (
                            <React.Fragment>
                                <BalanceListHeader>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            Name
                                        </Grid>
                                        <Grid item xs={2}>
                                            Currency
                                        </Grid>
                                        <Grid item xs={2}>
                                            Balance
                                        </Grid>
                                    </Grid>
                                </BalanceListHeader>
                                {
                                    balances.map(balance => (
                                        <BalanceCard
                                            key={balance.id}
                                            balance={balance}
                                        />
                                    ))
                                }
                            </React.Fragment>
                        ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    accountHasBalances: selectAccountHasBalances(ownProps.accountId)(state),
    isFetchingBalances: selectIsFetchingBalances(state),
    balances: selectAccountBalances(ownProps.accountId)(state),
});

export default connect(mapStateToProps)(BalancesList);
