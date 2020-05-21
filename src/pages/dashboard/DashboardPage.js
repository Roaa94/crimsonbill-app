import React from 'react';
import {DashboardPageContent, DashboardPageWrapper} from "./DashboardPage.styles";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import TransactionsDrawer from "../../components/transactions/latest-transactions/LatestTransactionsDrawer";
import {selectUserData} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {selectHasAccounts, selectIsFetchingAccounts} from "../../redux/accounts/accounts.selectors";
import WithLoader from "../../components/HOC/WithLoader";

const DashboardContentWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const DashboardPage = ({user, hasAccounts, isFetchingAccounts}) => {
    const [drawerOpen, setDrawerOpen] = React.useState(true);

    return (
        <DashboardPageWrapper drawerOpen={drawerOpen}>
            <div className='open-drawer-icon-container' onClick={() => setDrawerOpen(!drawerOpen)}>
                <ArrowBackRoundedIcon/>
            </div>
            <TransactionsDrawer open={drawerOpen}/>
            <DashboardPageContent drawerOpen={drawerOpen}>
                <DashboardContentWithLoader loading={isFetchingAccounts}>
                    <h1 className='light'>Welcome {user.displayName}</h1>
                    {
                        hasAccounts ? (
                            <div>You have accounts dude!</div>
                        ) : <AddAccountView/>
                    }
                </DashboardContentWithLoader>
            </DashboardPageContent>
        </DashboardPageWrapper>
    );
}

const mapStateToProps = state => ({
    user: selectUserData(state),
    hasAccounts: selectHasAccounts(state),
    isFetchingAccounts: selectIsFetchingAccounts(state),
});

export default connect(mapStateToProps)(DashboardPage);