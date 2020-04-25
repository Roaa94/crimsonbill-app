import React from 'react';
import PageWrapper from "../../components/ui/PageWrapper";
import {selectUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import AccountForm from "../../components/accounts/account-form/AccountForm.component";
import {selectAccountFormShow} from "../../redux/account-form/account-form.selectors";
import {createStructuredSelector} from "reselect";
import {toggleAccountForm} from "../../redux/account-form/account-form.actions";
import {AccountsCardsListWrapper, AccountsPageHeader} from "./AccountsPage.styles";
import AccountCard from "../../components/accounts/account-card/AccountCard.component";
import {selectAccountLoading} from "../../redux/loaders/loaders.selectors";
import WithLoader from "../../components/HOC/WithLoader";

const AccountsCardsList = WithLoader(AccountsCardsListWrapper);

class AccountsPage extends React.Component {

    render() {
        let {user, accountFormShow, toggleAccountForm, accountLoading} = this.props;
        let hasAccounts = user.accounts && user.accounts.length > 0;

        return (
            <PageWrapper>
                {
                    hasAccounts ?
                        <AccountsPageHeader>
                            <h3>Accounts</h3>
                            <button onClick={() => toggleAccountForm(true)}>Add Account</button>
                        </AccountsPageHeader>
                        : null
                }
                {
                    accountFormShow  ? <AccountForm/> : null
                }
                {
                    hasAccounts
                        ? <div>
                            <AccountsCardsList loading={accountLoading}>
                                {
                                    user.accounts.map(({id, ...accountDetails}) => (
                                        <AccountCard id={id} {...accountDetails} key={id}/>
                                    ))
                                }
                            </AccountsCardsList>
                        </div>
                        : accountFormShow ? null : <AddAccountView/>
                }
            </PageWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    accountFormShow: selectAccountFormShow,
    accountLoading: selectAccountLoading,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);