import React from 'react';
import PageWrapper from "../components/ui/PageWrapper";
import AddAccountView from "../components/accounts/AddAccountView";
import {selectCurrentUser} from "../redux/user/user.selectors";
import {connect} from "react-redux";

class StatisticsPage extends React.Component {
    render() {
        let {currentUser} = this.props;

        return (
            <PageWrapper>
                {
                    currentUser.accounts && currentUser.accounts.length > 0
                        ? <div>You have some accounts</div>
                        : <AddAccountView path='account-form'/>
                }
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(StatisticsPage);