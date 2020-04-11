import React from 'react';
import {DashboardPageContent, DashboardPageWrapper} from "./DashboardPage.styles";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import TransactionsDrawer from "../../components/transactions-drawer";
import {selectCurrentUser} from "../../redux/user/user.selectors";
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
        let {currentUser} = this.props;

        return (
            <DashboardPageWrapper drawerOpen={drawerOpen}>
                <div className='open-drawer-icon-container' onClick={this.handleDrawerToggle}>
                    {
                        drawerOpen ? <ArrowForwardRoundedIcon/> : <ArrowBackRoundedIcon/>
                    }
                </div>
                <TransactionsDrawer open={drawerOpen}/>
                <DashboardPageContent>
                    <h1 className='light'>Welcome {currentUser.displayName}</h1>
                    {
                        currentUser.accounts && currentUser.accounts.length > 0
                            ? <div>You have some accounts</div>
                            : (
                                <AddAccountView drawerOpen={drawerOpen}/>
                            )
                    }
                </DashboardPageContent>
            </DashboardPageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(DashboardPage);