import React from 'react';
import {DashboardPageWrapper} from "./DashboardPage.styles";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import TransactionsDrawer from "../../components/transactions/latest-transactions/LatestTransactionsDrawer";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {selectHasAccounts, selectIsFetchingAccounts} from "../../redux/accounts/accounts.selectors";
import WithLoader from "../../components/HOC/WithLoader";
import DashboardHeader from "../../components/dashboard/dashboard-header/DashboardHeader";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import {createStructuredSelector} from "reselect";
import {selectTransactionsDrawerOpen} from "../../redux/transactions/transactions.selectors";
import {toggleTransactionsDrawer} from "../../redux/transactions/transactions.actions";
import DashboardContent from "../../components/dashboard/dashboard-content/DashboardContent";

const DashboardContentWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const DashboardPage = (
    {
        hasAccounts,
        isFetchingAccounts,
        transactionsDrawerOpen,
        toggleTransactionsDrawer
    }
) => {

    return (
        <DashboardPageWrapper drawerOpen={transactionsDrawerOpen}>
            <div
                className='open-drawer-icon-container'
                onClick={() => toggleTransactionsDrawer(!transactionsDrawerOpen)}
            >
                <ArrowBackRoundedIcon/>
            </div>
            <TransactionsDrawer/>
            <div className='content'>
                <DashboardContentWithLoader loading={isFetchingAccounts}>
                    {
                        hasAccounts ? (
                            <React.Fragment>
                                <DashboardTitle/>
                                <DashboardHeader/>
                                <DashboardContent/>
                            </React.Fragment>
                        ) : <AddAccountView/>
                    }
                </DashboardContentWithLoader>
            </div>
        </DashboardPageWrapper>
    );
}

const mapStateToProps = createStructuredSelector({
    hasAccounts: selectHasAccounts,
    isFetchingAccounts: selectIsFetchingAccounts,
    transactionsDrawerOpen: selectTransactionsDrawerOpen,
});

const mapDispatchToProps = dispatch => ({
    toggleTransactionsDrawer: value => dispatch(toggleTransactionsDrawer(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);