import React from 'react';
import PageWrapper from "../components/ui/PageWrapper";
import AddAccountView from "../components/accounts/AddAccountView";
import {selectUser} from "../redux/user/user.selectors";
import {connect} from "react-redux";

class StatisticsPage extends React.Component {
    render() {
        let {user} = this.props;

        return (
            <PageWrapper>
                {
                    user.accounts && user.accounts.length > 0
                        ? <div>You have some accounts</div>
                        : <AddAccountView path='account-form'/>
                }
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

export default connect(mapStateToProps)(StatisticsPage);