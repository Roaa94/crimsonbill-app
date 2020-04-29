import React from 'react';
import {deleteAccountDocument} from "../../../firebase/accounts.firebase-utils";
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
import AccountForm from "../account-form/AccountForm.component";
import Box from "@material-ui/core/Box";
import BalancesList from "../balance-list/BalancesList.component";

class AccountCard extends React.Component {

    state = {
        showAccountForm: false,
        accountCardExpanded: false,
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
        let {id, type, name, currency, notes, totalBalance} = this.props;
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
                        ) : null
                    }
                    <BalancesList accountId={id} />
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
