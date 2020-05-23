import React from 'react';
import {DashboardPageContent, DashboardPageWrapper} from "./DashboardPage.styles";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import TransactionsDrawer from "../../components/transactions/latest-transactions/LatestTransactionsDrawer";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {selectHasAccounts, selectIsFetchingAccounts} from "../../redux/accounts/accounts.selectors";
import WithLoader from "../../components/HOC/WithLoader";
import DashboardHeader from "../../components/dashboard/dashboard-header/DashboardHeader";
import DashboardTitle from "../../components/dashboard/DashboardTitle";

const DashboardContentWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const DashboardPage = ({hasAccounts, isFetchingAccounts}) => {
    const [drawerOpen, setDrawerOpen] = React.useState(true);

    return (
        <DashboardPageWrapper drawerOpen={drawerOpen}>
            <div className='open-drawer-icon-container' onClick={() => setDrawerOpen(!drawerOpen)}>
                <ArrowBackRoundedIcon/>
            </div>
            <TransactionsDrawer open={drawerOpen}/>
            <DashboardPageContent drawerOpen={drawerOpen}>
                <DashboardContentWithLoader loading={isFetchingAccounts}>
                    {
                        hasAccounts ? (
                            <React.Fragment>
                                <DashboardTitle/>
                                <DashboardHeader/>
                            </React.Fragment>
                        ) : <AddAccountView/>
                    }
                </DashboardContentWithLoader>
            </DashboardPageContent>
        </DashboardPageWrapper>
    );
}

const mapStateToProps = state => ({
    hasAccounts: selectHasAccounts(state),
    isFetchingAccounts: selectIsFetchingAccounts(state),
});

export default connect(mapStateToProps)(DashboardPage);