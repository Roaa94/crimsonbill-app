import React from 'react';
import Box from "@material-ui/core/Box";
import AddIconButton from "../../ui/buttons/AddIconButton";
import {selectUserId} from "../../../redux/user/user.selectors";
import {
    selectAccountBalances,
} from "../../../redux/accounts/accounts.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {BalanceListHeader} from "./BalancesList.styles";
import BalanceCard from "../balance-card/BalanceCard";
import BalanceForm from "../BalanceForm";
import {colors} from "../../../styles/global";

class BalancesList extends React.Component {
    state = {
        showBalanceForm: false,
    };

    render() {
        let {accountId, balances, isBalancesLoaded} = this.props;
        let {showBalanceForm} = this.state;

        return (
            <div>
                <Box display='flex' alignItems='center'>
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
                    isBalancesLoaded && balances.length !== 0
                        ? (
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
                        ) : null
                }
                {
                    isBalancesLoaded ?
                        (
                            balances.map(({id, ...balanceDetails}) => (
                                <BalanceCard
                                    accountId={accountId}
                                    balanceId={id}
                                    key={id}
                                    {...balanceDetails}
                                />
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
    isBalancesLoaded: !!selectAccountBalances(ownProps.accountId)(state),
});

export default connect(mapStateToProps)(BalancesList);
