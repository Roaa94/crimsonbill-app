import React from 'react';
import {deleteUserAccountDocument} from "../../../firebase/accounts.utils";
import {createStructuredSelector} from "reselect";
import {selectUser} from "../../../redux/user/user.selectors";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";
import {AccountCardExpansionPanel, AccountCardExpansionPanelHeader, ExpansionPanelContent} from './AccountCard.styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import FormattedNumber from "../../ui/FormattedNumber";
import DropDown from "../../ui/navigation/drop-down/DropDown.component";
import Grid from "@material-ui/core/Grid";

class AccountCard extends React.Component {

    deleteAccount = async (accountId) => {
        let {user} = this.props;
        await deleteUserAccountDocument(user.id, accountId);
    };


    render() {
        let {id, type, name, currency, notes, balance} = this.props;

        const accountCardMenuItems = [
            {
                id: 0,
                title: 'Edit Account',
                handleClick: () => {
                },
            },
            {
                id: 1,
                title: 'Delete Account',
                handleClick: () => this.deleteAccount(id),
            }
        ];

        return (
            <AccountCardExpansionPanel>
                <ExpansionPanelSummary>
                    <AccountCardExpansionPanelHeader>
                        <Grid container alignItems='center'>
                            <Grid item xs={4}>
                                <h3>{name}</h3>
                            </Grid>
                            <Grid item xs={4} align='center'>
                                <h3 className='account-currency'>
                                    <FormattedNumber number={balance} currency={currency}/>
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
                    {notes}
                </ExpansionPanelContent>
            </AccountCardExpansionPanel>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    accountFormShow: selectAccountFormShow,
});

export default connect(mapStateToProps)(AccountCard);
