import React from 'react';
import {deleteUserAccountDocument} from "../../../firebase/accounts.firebase-utils";
import {selectUserId} from "../../../redux/user/user.selectors";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";
import {
    AccountCardExpansionPanel,
    AccountCardExpansionPanelHeader,
    AccountCardExpansionPanelSummary,
    ExpansionPanelContent
} from './AccountCard.styles';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import FormattedNumber from "../../ui/FormattedNumber";
import DropDown from "../../ui/navigation/drop-down/DropDown.component";
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/button-filled/Button.component";
import {colors} from "../../../styles/global";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AccountForm from "../account-form/AccountForm.component";
import Box from "@material-ui/core/Box";
import {fetchBalancesStartAsync} from "../../../redux/accounts/accounts.actions";
import {selectAccountBalances} from "../../../redux/accounts/accounts.selectors";

class AccountCard extends React.Component {
    componentDidMount() {
        let {id, userId, fetchBalancesStartAsync} = this.props;
        fetchBalancesStartAsync(userId, id);
    }

    state = {
        showAccountForm: false,
        accountCardExpanded: false,
    }

    deleteAccount = async (accountId) => {
        let {userId} = this.props;
        await deleteUserAccountDocument(userId, accountId);
    };

    handleExpansionPanelChange = () => {
        let {accountCardExpanded} = this.state;
        this.setState({
            accountCardExpanded: !accountCardExpanded,
        });
        if (!accountCardExpanded) {
            this.setState({
                showAccountForm: false,
            });
        }
    }

    render() {
        let {id, type, name, currency, notes, totalBalance, balances} = this.props;
        let {showAccountForm, accountCardExpanded} = this.state;
        console.log('balances');
        console.log(balances);
        const accountCardMenuItems = [
            {
                id: 0,
                title: 'Edit Account',
                handleClick: () => {
                    this.setState({
                        showAccountForm: true,
                        accountCardExpanded: true,
                    });
                },
            },
            {
                id: 1,
                title: 'Delete Account',
                handleClick: async () => {
                    this.setState({showAccountForm: false});
                    await this.deleteAccount(id);
                },
            }
        ];

        return (
            <AccountCardExpansionPanel
                TransitionProps={{unmountOnExit: true}}
                expanded={accountCardExpanded}
                onChange={this.handleExpansionPanelChange}
            >
                <AccountCardExpansionPanelSummary>
                    <AccountCardExpansionPanelHeader>
                        <Grid container alignItems='center'>
                            <Grid item xs={4}>
                                <h3>{name}</h3>
                            </Grid>
                            <Grid item xs={4} align='center'>
                                <h3 className='account-currency'>
                                    <FormattedNumber number={totalBalance} currency={currency}/>
                                </h3>
                            </Grid>
                            <Grid item xs={4} container justify='flex-end'>
                                <div className='account-type'>
                                    <AccountBalanceRoundedIcon/>
                                    {type}
                                </div>
                                <DropDown menuItems={accountCardMenuItems}/>
                            </Grid>
                        </Grid>
                    </AccountCardExpansionPanelHeader>
                </AccountCardExpansionPanelSummary>
                <ExpansionPanelContent>
                    {
                        notes ? (
                            <Box mb={2}>
                                {notes}
                            </Box>
                        ) : null
                    }
                    {
                        showAccountForm ? (
                            <AccountForm
                                accountId={id}
                                handleFormCancel={() => this.setState({showAccountForm: false})}
                            />
                        ) : (
                            <div>
                                <Button
                                    fullWidth={false}
                                    bgColor={colors.info}
                                    prefixIcon={<AddRoundedIcon/>}
                                    margin='0 20px 0 0'
                                >
                                    Add Balance
                                </Button>
                                <Button
                                    fullWidth={false}
                                    bgColor={colors.info}
                                    prefixIcon={<AddRoundedIcon/>}
                                >
                                    Add Transaction
                                </Button>
                            </div>
                        )
                    }

                </ExpansionPanelContent>
            </AccountCardExpansionPanel>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    accountFormShow: selectAccountFormShow(state),
    balances: selectAccountBalances(ownProps.id)(state),
});

const mapDispatchToProps = dispatch => ({
    fetchBalancesStartAsync: (userId, accountId) => dispatch(fetchBalancesStartAsync(userId, accountId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard);
