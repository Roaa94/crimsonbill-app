import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
import {createStructuredSelector} from "reselect";
import {selectIsLoadingAllAccountsData} from "../../redux/global/misc.selectors";
import {selectHasAccounts} from "../../redux/accounts/accounts.selectors";
import WithLoader from "../../components/HOC/WithLoader";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Balance from "../../components/Balance";
import DefaultCurrencySelect from "../../components/currencies/DefaultCurrencySelect";
import AddAccountView from "../../components/accounts/AddAccountView";
import {ChartCard} from "./StatisticsPage.styles";
import ActivityAreaChart from "../../components/transactions/transactions-charts/ActivityAreaChart";
import FiltersCard from "../../components/filters-card/FiltersCard";
import TransactionsTaxonomiesPieChart
    from "../../components/transactions/transactions-charts/TransactionsTaxonomiesPieChart";

const StatisticsPageWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const StatisticsPage = ({isLoadingAllAccountsData, hasAccounts}) => {

    return (
        <PageWrapper>
            <StatisticsPageWithLoader loading={isLoadingAllAccountsData}>
                {
                    hasAccounts ?
                        <Grid spacing={2} container justify='space-between' alignItems='center'>
                            <Grid item xs={12} md={4}>
                                <h3>Statistics</h3>
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
                            <Grid item xs={12}>
                                <FiltersCard/>
                            </Grid>
                            <Grid item xs={12}>
                                <ChartCard>
                                    <h4>Activity</h4>
                                    <ActivityAreaChart/>
                                </ChartCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ChartCard height={250}>
                                    <h4>Spending Categories</h4>
                                    <TransactionsTaxonomiesPieChart type='spending'/>
                                </ChartCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ChartCard height={250}>
                                    <h4>Income Sources</h4>
                                    <TransactionsTaxonomiesPieChart type='earning'/>
                                </ChartCard>
                            </Grid>
                        </Grid>
                        : <AddAccountView/>
                }
            </StatisticsPageWithLoader>
        </PageWrapper>
    );
}

const mapStateToProps = createStructuredSelector({
    hasAccounts: selectHasAccounts,
    isLoadingAllAccountsData: selectIsLoadingAllAccountsData,
})

export default connect(mapStateToProps)(StatisticsPage);