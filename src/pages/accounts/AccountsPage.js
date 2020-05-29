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
    selectHasAccounts,
} from "../../redux/accounts/accounts.selectors";
import {toggleAccountForm} from "../../redux/accounts/accounts.actions";
import Grid from "@material-ui/core/Grid";
import DefaultCurrencySelect from "../../components/currencies/DefaultCurrencySelect";
import {selectIsLoadingAllAccountsData} from "../../redux/global/misc.selectors";
import Balance from "../../components/Balance";
import FiltersCard from "../../components/filters-card/FiltersCard";
import Box from "@material-ui/core/Box";

const AccountsListWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const AccountsPage = (
    {
        accountFormShow,
        toggleAccountForm,
        accounts,
        hasAccounts,
        isLoadingAllAccountsData
    }
) => {

    return (
        <PageWrapper>
            <AccountsListWithLoader loading={isLoadingAllAccountsData}>
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
                                    <Balance type='dots'/>
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
                        ? (
                            <React.Fragment>
                                <Box mt={3}>
                                    <FiltersCard/>
                                </Box>
                                {
                                    accounts.map(({id, ...accountDetails}) => (
                                        <AccountCard id={id} {...accountDetails} key={id}/>
                                    ))
                                }
                            </React.Fragment>
                        ) : accountFormShow ? null : <AddAccountView/>
                }
            </AccountsListWithLoader>
        </PageWrapper>
    );
}

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
    hasAccounts: selectHasAccounts,
    accounts: selectAccountsArray,
    accountFormShow: selectAccountFormShow,
    isLoadingAllAccountsData: selectIsLoadingAllAccountsData,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);