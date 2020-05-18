import React from 'react';
import {DashboardPageContent, DashboardPageWrapper} from "./DashboardPage.styles";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import TransactionsDrawer from "../../components/transactions/TransactionsDrawer";
import {selectUserData} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";

class DashboardPage extends React.Component {
    state = {
        drawerOpen: true,
    };

    handleDrawerToggle = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    };

    render() {
        let {drawerOpen} = this.state;
        let {user} = this.props;

        return (
            <DashboardPageWrapper drawerOpen={drawerOpen}>
                <div className='open-drawer-icon-container' onClick={this.handleDrawerToggle}>
                    <ArrowBackRoundedIcon/>
                </div>
                <TransactionsDrawer open={drawerOpen}/>
                <DashboardPageContent>
                    <h1 className='light'>Welcome {user.displayName}</h1>
                    <AddAccountView drawerOpen={drawerOpen}/>
                </DashboardPageContent>
            </DashboardPageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    user: selectUserData(state),
});

export default connect(mapStateToProps)(DashboardPage);