import React from 'react';
import {deleteUserAccountDocument} from "../../../firebase/accounts.utils";
import {createStructuredSelector} from "reselect";
import {selectUser} from "../../../redux/user/user.selectors";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";
import {ExpansionPanel, ExpansionPanelHeader, ExpansionPanelContent} from './AccountCard.styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';

class AccountCard extends React.Component {

    deleteAccount = async (accountId) => {
        let {user} = this.props;
        await deleteUserAccountDocument(user.id, accountId);
    };

    render() {
        let {id, type, name, currency, notes} = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <ExpansionPanelHeader>
                        <h3>{name}</h3>
                        <h3 className='account-currency'>{currency}</h3>
                        <div className='account-type'>
                            <AccountBalanceRoundedIcon/>
                            {type}
                        </div>
                    </ExpansionPanelHeader>
                </ExpansionPanelSummary>
                <ExpansionPanelContent>
                    {notes}
                    <button onClick={() => this.deleteAccount(id)}>Delete</button>
                </ExpansionPanelContent>
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    accountFormShow: selectAccountFormShow,
});

export default connect(mapStateToProps)(AccountCard);
