import React from 'react';
import Box from "@material-ui/core/Box";
import AddIconButton from "../../ui/buttons/AddIconButton";
import {selectUserId} from "../../../redux/user/user.selectors";
import {
    selectAccountBalances,
    selectIsBalancesLoaded
} from "../../../redux/accounts/accounts.selectors";
import {fetchBalancesStartAsync} from "../../../redux/accounts/accounts.actions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {BalanceListHeader} from "./BalancesList.styles";
import BalanceCard from "../balance-card/BalanceCard.component";

class BalancesList extends React.Component {
    componentDidMount() {
        let {accountId, userId, fetchBalancesStartAsync} = this.props;
        fetchBalancesStartAsync(userId, accountId);
    }

    render() {
        let {balances, isBalancesLoaded} = this.props;

        return (
            <div>
                <Box display='flex' alignItems='center'>
                    <h4>Balances</h4>
                    <AddIconButton handleClick={() => {
                    }}/>
                </Box>
                <BalanceListHeader>
                    <Grid container>
                        <Grid item xs={3}>
                            Name
                        </Grid>
                        <Grid item xs={2}>
                            Currency
                        </Grid>
                        <Grid item xs={2}>
                            Balance
                        </Grid>
                        <Grid item xs/>
                        <Grid item xs={4}>
                            Actions
                        </Grid>
                    </Grid>
                </BalanceListHeader>
                {
                    isBalancesLoaded ?
                        (
                            balances.map(({id, ...balanceDetails}) => (
                                <BalanceCard key={id} {...balanceDetails} />
                            ))
                        ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    balances: selectAccountBalances(ownProps.accountId)(state),
    isBalancesLoaded: selectIsBalancesLoaded(ownProps.accountId)(state),
});

const mapDispatchToProps = dispatch => ({
    fetchBalancesStartAsync: (userId, accountId) => dispatch(fetchBalancesStartAsync(userId, accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BalancesList);
