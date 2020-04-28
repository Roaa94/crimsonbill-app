import React from 'react';
import Box from "@material-ui/core/Box";
import AddIconButton from "../ui/buttons/AddIconButton";
import {selectUserId} from "../../redux/user/user.selectors";
import {selectAccountBalances} from "../../redux/accounts/accounts.selectors";
import {fetchBalancesStartAsync} from "../../redux/accounts/accounts.actions";
import {connect} from "react-redux";

class BalanceList extends React.Component {
    componentDidMount() {
        let {accountId, userId, fetchBalancesStartAsync} = this.props;
        fetchBalancesStartAsync(userId, accountId);
    }

    render() {
        let {balances} = this.props;

        console.log('balances');
        console.log(balances);
        return (
            <div>
                <Box display='flex' alignItems='center'>
                    <h4>Balances</h4>
                    <AddIconButton handleClick={() => {}} />
                </Box>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    balances: selectAccountBalances(ownProps.accountId)(state),
});

const mapDispatchToProps = dispatch => ({
    fetchBalancesStartAsync: (userId, accountId) => dispatch(fetchBalancesStartAsync(userId, accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BalanceList);
