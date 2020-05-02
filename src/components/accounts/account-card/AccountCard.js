import React from 'react';
import {deleteAccountDocument} from "../../../firebase/accounts.firebase-utils";
import {selectUserId} from "../../../redux/user/user.selectors";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";
import {
    AccountCardExpansionPanel,
    AccountCardExpansionPanelHeader,
    ExpansionPanelContent
} from './AccountCard.styles';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import FormattedNumber from "../../ui/FormattedNumber";
import DropDown from "../../ui/navigation/DropDown";
import Grid from "@material-ui/core/Grid";
import AccountForm from "../account-form/AccountForm";
import Box from "@material-ui/core/Box";
import BalancesList from "../../balances/balance-list/BalancesList";
import TransactionsList from "../../transactions/transactions-list/TransactionsList";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

class AccountCard extends React.Component {

    state = {
        showAccountForm: false,
        accountCardExpanded: true,
    }

    deleteAccount = async (accountId) => {
        let {userId} = this.props;
        await deleteAccountDocument(userId, accountId);
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
        let {id, type, name, currency, notes, hasBalances, totalBalance} = this.props;
        let {showAccountForm, accountCardExpanded} = this.state;

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
                expanded={accountCardExpanded}
                onChange={this.handleExpansionPanelChange}
            >
                <ExpansionPanelSummary>
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
                </ExpansionPanelSummary>
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
                        ) : null
                    }
                    {
                        hasBalances
                            ? <BalancesList accountId={id}/>
                            : <TransactionsList accountId={id}/>
                    }
                </ExpansionPanelContent>
            </AccountCardExpansionPanel>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: selectUserId(state),
    accountFormShow: selectAccountFormShow(state),
});

export default connect(mapStateToProps)(AccountCard);