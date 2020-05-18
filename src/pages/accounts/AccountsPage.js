import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {createStructuredSelector} from "reselect";
import AccountCard from "../../components/accounts/account-card/AccountCard";
import AddIconButton from "../../components/ui/buttons/AddIconButton";
import AccountFormContainer from "../../components/accounts/account-form/AccountFormContainer";
import WithLoader from "../../components/HOC/WithLoader";
import {
    selectDefaultCurrencyCode,
    selectIsCalculatingBalance,
    selectUserId,
    selectUserTotalBalance
} from "../../redux/user/user.selectors";
import {
    selectAccountFormShow,
    selectAccountsArray,
    selectHasAccounts, selectIsFetchingAccounts,
} from "../../redux/accounts/accounts.selectors";
import {toggleAccountForm} from "../../redux/accounts/accounts.actions";
import Grid from "@material-ui/core/Grid";
import DefaultCurrencySelect from "../../components/currencies/DefaultCurrencySelect";
import FormattedNumber from "../../components/ui/FormattedNumber";
import {TotalBalance} from "./AccountsPage.styles";

const AccountsListWithLoader = WithLoader(({children}) => <div>{children}</div>);
const TotalBalanceWithLoader = WithLoader(({children}) => <TotalBalance>{children}</TotalBalance>, 'span');

const AccountsPage = (
    {
        accountFormShow,
        toggleAccountForm,
        accounts,
        isFetchingAccountsData,
        hasAccounts,
        userTotalBalance,
        defaultCurrencyCode,
        isCalculatingBalance
    }
) => {

    return (
        <PageWrapper>
            <AccountsListWithLoader loading={isFetchingAccountsData}>
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
                            <Grid item xs={12} md={4} spacing={2} container justify='center' alignItems='center'>
                                <Grid item>
                                    Total Balance
                                </Grid>
                                <Grid item>
                                    <TotalBalanceWithLoader loading={isCalculatingBalance} type='dots'>
                                        <FormattedNumber
                                            number={userTotalBalance}
                                            currencyCode={defaultCurrencyCode}
                                        />
                                    </TotalBalanceWithLoader>
                                </Grid>
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
                        ? accounts.map(({id, ...accountDetails}) => (
                            <AccountCard id={id} {...accountDetails} key={id}/>
                        )) : accountFormShow ? null : <AddAccountView/>
                }
            </AccountsListWithLoader>
        </PageWrapper>
    );
}

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
    userTotalBalance: selectUserTotalBalance,
    defaultCurrencyCode: selectDefaultCurrencyCode,
    hasAccounts: selectHasAccounts,
    accounts: selectAccountsArray,
    accountFormShow: selectAccountFormShow,
    isFetchingAccounts: selectIsFetchingAccounts,
    isCalculatingBalance: selectIsCalculatingBalance,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);