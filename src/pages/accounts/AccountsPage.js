import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
import {selectUser, selectUserAccountsLoaded} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {selectAccountFormShow} from "../../redux/account-form/account-form.selectors";
import {createStructuredSelector} from "reselect";
import {toggleAccountForm} from "../../redux/account-form/account-form.actions";
import {AccountsPageHeader} from "./AccountsPage.styles";
import AccountCard from "../../components/accounts/account-card/AccountCard.component";
import AddIconButton from "../../components/ui/buttons/AddIconButton";
import AccountFormContainer from "../../components/accounts/account-form/AccountFormContainer";
import WithLoader from "../../components/HOC/WithLoader";

const AccountsListWithLoader = WithLoader(({children}) => <div>{children}</div>);

class AccountsPage extends React.Component {

    render() {
        let {user, accountFormShow, toggleAccountForm, accountsLoading} = this.props;
        let hasAccounts = user.accounts && user.accounts.length > 0;
        console.log('accountsLoading');
        console.log(accountsLoading);
        return (
            <PageWrapper>
                {
                    hasAccounts ?
                        <AccountsPageHeader>
                            <h3>Accounts</h3>
                            <AddIconButton handleClick={() => toggleAccountForm(true)} disabled={accountFormShow} />
                        </AccountsPageHeader>
                        : null
                }
                <AccountFormContainer/>
                {
                    hasAccounts
                        ? <AccountsListWithLoader loading={accountsLoading}>
                            {
                                user.accounts.map(({id, ...accountDetails}) => (
                                    <AccountCard id={id} {...accountDetails} key={id}/>
                                ))
                            }
                        </AccountsListWithLoader>
                        : accountFormShow ? null : <AddAccountView/>
                }
            </PageWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    accountFormShow: selectAccountFormShow,
    accountsLoading: state => !selectUserAccountsLoaded(state)
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);