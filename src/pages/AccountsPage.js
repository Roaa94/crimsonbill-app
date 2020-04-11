import React from 'react';
import PageWrapper from "../components/ui/PageWrapper";
import {selectCurrentUser} from "../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../components/accounts/AddAccountView";
import {firestore} from "../firebase/firebase.utils";
import {convertAccountsCollectionToArray} from "../firebase/accounts.utils";
import {updateUserAccounts} from "../redux/user/user.actions";
import {ReactComponent as Loader} from '../assets/svg/loader.svg';

class AccountsPage extends React.Component {
    _isMounted = false;

    state = {
        loadingAccounts: true,
    };

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loadingAccounts: true});
        }
        let {currentUser, updateAccounts} = this.props;
        const accountsRef = firestore.collection(`users/${currentUser.id}/accounts`);
        accountsRef.onSnapshot(async accountsSnapshot => {
            let accountsArray = convertAccountsCollectionToArray(accountsSnapshot);
            await updateAccounts(accountsArray);
            if (this._isMounted) {
                this.setState({loadingAccounts: false});
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {currentUser, history} = this.props;
        let {loadingAccounts} = this.state;

        return (
            <PageWrapper>
                {
                    loadingAccounts ?
                        <Loader/> : (currentUser.accounts && currentUser.accounts.length > 0
                        ? currentUser.accounts.map(({id, type, name, currency, details}) => (
                            <div key={id}>
                                <p>Type: {type}</p>
                                <p>Name: {name}</p>
                                <p>Currency: {currency}</p>
                                <p>Details: {details}</p>
                                <button onClick={() => history.push(`account-form/${id}`)}>Edit</button>
                                <button>Delete</button>
                                <hr/>
                            </div>
                        ))
                        : <AddAccountView/>)
                }
                <button onClick={() => history.push('account-form')}>Add Account</button>
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    updateAccounts: accounts => dispatch(updateUserAccounts(accounts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);