import React from 'react';
import {deleteUserAccountDocument} from "../../../firebase/accounts.utils";
import {createStructuredSelector} from "reselect";
import {selectUser} from "../../../redux/user/user.selectors";
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

class AccountCard extends React.Component {

    deleteAccount = async (accountId) => {
        let {user} = this.props;
        await deleteUserAccountDocument(user.id, accountId);
    };


    render() {
        let {id, type, name, currency, notes, totalBalance} = this.props;

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
                    {notes}
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
