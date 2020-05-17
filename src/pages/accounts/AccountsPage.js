import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {createStructuredSelector} from "reselect";
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
import Grid from "@material-ui/core/Grid";
import DefaultCurrencySelect from "../../components/currencies/DefaultCurrencySelect";

const AccountsListWithLoader = WithLoader(({children}) => <div>{children}</div>);

const AccountsPage = ({accountFormShow, toggleAccountForm, accounts, isFetchingAccounts, hasAccounts}) => {

    return (
        <PageWrapper>
            {
                hasAccounts ?
                    <Grid spacing={2} container justify='space-between' alignItems='center'>
                        <Grid item container xs={12} md={4} alignItems='center' justify='flex-start'>
                            <h3>Accounts</h3>
                            <AddIconButton
                                handleClick={() => toggleAccountForm(true)}
                                disabled={accountFormShow}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} container justify='center'>
                            total Balance
                        </Grid>
                        <Grid item xs={12} md={4} container justify='flex-end'>
                            <Grid item xs={12} md={7}>
                                <DefaultCurrencySelect/>
                            </Grid>
                        </Grid>
                    </Grid>
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