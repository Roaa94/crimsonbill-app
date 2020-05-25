import React from 'react';
import './App.css';
import {auth} from "./utils/firebase/firebase.utils";
import {Redirect, Route, Switch} from "react-router-dom";
import {setUser} from "./redux/user/user.actions";
import {connect} from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/home/HomePage";
import {selectUserData} from "./redux/user/user.selectors";
import {createUserProfileDocument} from "./utils/firebase/user.firebase-utils";
import {fetchTaxonomiesStartAsync} from "./redux/taxonomies/taxonomies.actions";
import {fetchCurrenciesStartAsync} from "./redux/currencies/currencies.actions";
import {fetchAccountsStartAsync} from "./redux/accounts/accounts.actions";
import {fetchTransactionsStartAsync} from "./redux/transactions/transactions.actions";
import {fetchBalancesStartAsync} from "./redux/balances/balances.actions";
import {selectFilters} from "./redux/filters/filters.selectors";

// import {initDefaultTaxonomies} from "./firebase/taxonomies.firebase-utils";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {
            setUser,
            user,
            fetchTaxonomiesStartAsync,
            fetchCurrenciesStartAsync,
            fetchAccountsStartAsync,
            fetchBalancesStartAsync,
            fetchTransactionsStartAsync,
            filters,
        } = this.props;

        fetchCurrenciesStartAsync();

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                //The create user profile document always returns a user object
                //If a user is logged in it returns its value and doesn't create a new document
                const userRef = await createUserProfileDocument(user);
                if (userRef) {
                    userRef.onSnapshot(async snapShot => {
                        setUser({
                            id: snapShot.id,
                            ...snapShot.data(),
                        });
                        //Use for testing to write default taxonomies
                        // await initDefaultTaxonomies(snapShot.id);
                    });
                }
                return;
            }
            setUser(user);
        });
        if (user && user.id) {
            fetchTaxonomiesStartAsync(user.id);
            fetchAccountsStartAsync(user.id);
            fetchBalancesStartAsync(user.id);
            fetchTransactionsStartAsync(user.id, filters);
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        let {user} = this.props;

        return (
            <Switch>
                <Route exact path='/' render={
                    () => user ? <Redirect to='/home'/> : <AuthPage/>
                }/>
                <Route exact path='/sign-up' render={
                    () => user ? <Redirect to='/home'/> : <AuthPage/>
                }/>
                <Route path='/home' render={
                    () => user ? <HomePage path='/home'/> : <Redirect to='/'/>
                }/>
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    user: selectUserData(state),
    filters: selectFilters(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setUser: user => dispatch(setUser(user)),
    fetchTaxonomiesStartAsync: userId => dispatch(fetchTaxonomiesStartAsync(userId)),
    fetchCurrenciesStartAsync: userId => dispatch(fetchCurrenciesStartAsync(userId)),
    fetchAccountsStartAsync: userId => dispatch(fetchAccountsStartAsync(userId)),
    fetchBalancesStartAsync: userId => dispatch(fetchBalancesStartAsync(userId)),
    fetchTransactionsStartAsync: (userId, filters) => dispatch(fetchTransactionsStartAsync(userId, filters)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
