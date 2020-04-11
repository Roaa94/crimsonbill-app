import React from 'react';
import {DashboardPageWrapper} from "./DashboardPage.styles";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import TransactionsDrawer from "../../components/transactions-drawer";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";

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
                <div>
                    <h1 className='light'>Welcome {currentUser.displayName}</h1>
                </div>
            </DashboardPageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(DashboardPage);