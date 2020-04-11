import React from 'react';
import PageWrapper from "../components/ui/PageWrapper";
import {selectCurrentUser} from "../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../components/accounts/AddAccountView";

class AccountsPage extends React.Component {
    render() {
        let {currentUser, history} = this.props;

        return (
            <PageWrapper>
                {
                    currentUser.accounts && currentUser.accounts.length > 0
                        ? currentUser.accounts.map(({id, type, name, currency, details}) => (
                            <div key={id}>
                                <p>Type: {type}</p>
                                <p>Name: {name}</p>
                                <p>Currency: {currency}</p>
                                <p>Details: {details}</p>
                                <hr/>
                            </div>
                        ))
                        : <AddAccountView/>
                }
                <button onClick={() => history.push('account-form')}>Add Account</button>
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(AccountsPage);