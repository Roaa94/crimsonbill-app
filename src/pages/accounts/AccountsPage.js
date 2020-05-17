import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {createStructuredSelector} from "reselect";
import {AccountsPageHeader} from "./AccountsPage.styles";
import AccountCard from "../../components/accounts/account-card/AccountCard";
import AddIconButton from "../../components/ui/buttons/AddIconButton";
import AccountFormContainer from "../../components/accounts/account-form/AccountFormContainer";
import WithLoader from "../../components/HOC/WithLoader";
import {selectUserId} from "../../redux/user/user.selectors";
import {
    selectAccountFormShow,
    selectAccountsArray,
    selectAccountsFetching, selectHasAccounts
} from "../../redux/accounts/accounts.selectors";
import {toggleAccountForm} from "../../redux/accounts/accounts.actions";

const AccountsListWithLoader = WithLoader(({children}) => <div>{children}</div>);

const AccountsPage = ({accountFormShow, toggleAccountForm, accounts, isFetchingAccounts, hasAccounts}) => {

    return (
        <PageWrapper>
            {
                hasAccounts ?
                    <AccountsPageHeader>
                        <h3>Accounts</h3>
                        <AddIconButton handleClick={() => toggleAccountForm(true)} disabled={accountFormShow}/>
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

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
    hasAccounts: selectHasAccounts,
    accounts: selectAccountsArray,
    accountFormShow: selectAccountFormShow,
    isFetchingAccounts: selectAccountsFetching,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);