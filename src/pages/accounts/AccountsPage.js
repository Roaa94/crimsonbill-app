import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
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
import {selectUser} from "../../redux/user/user.selectors";
import {selectAccountsArray, selectAccountsFetching} from "../../redux/accounts/accounts.selectors";
import {fetchAccountsStartAsync} from "../../redux/accounts/accounts.actions";

const AccountsListWithLoader = WithLoader(({children}) => <div>{children}</div>);

class AccountsPage extends React.Component {

    componentDidMount() {
        const {fetchAccountsStartAsync, user} = this.props;
        fetchAccountsStartAsync(user.id);
    }

    render() {
        let {accountFormShow, toggleAccountForm, accounts, isFetchingAccounts} = this.props;
        let hasAccounts = accounts && accounts.length > 0;
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
                        ? <AccountsListWithLoader loading={isFetchingAccounts}>
                            {
                                accounts.map(({id, ...accountDetails}) => (
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
    accounts: selectAccountsArray,
    accountFormShow: selectAccountFormShow,
    isFetchingAccounts: selectAccountsFetching,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
    fetchAccountsStartAsync: userId => dispatch(fetchAccountsStartAsync(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);