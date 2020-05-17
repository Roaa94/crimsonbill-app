import React from 'react';
import './App.css';
import {auth} from "./firebase/firebase.utils";
import {Redirect, Route, Switch} from "react-router-dom";
import {setUser} from "./redux/user/user.actions";
import {connect} from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/home/HomePage";
import {selectUser} from "./redux/user/user.selectors";
import {createUserProfileDocument} from "./firebase/user.firebase-utils";
import {fetchTaxonomiesStartAsync} from "./redux/taxonomies/taxonomies.actions";
import {fetchCurrenciesStartAsync} from "./redux/currencies/currencies.actions";
import {updateAppCurrenciesRates} from "./firebase/currencies.firebase-utils";
import {
    selectDefaultCurrencyCode,
    selectOtherCurrenciesCodes
} from "./redux/currencies/currencies.selectors";

// import {initDefaultTaxonomies} from "./firebase/taxonomies.firebase-utils";

class App extends React.Component {
    unsubscribeFromAuth = null;
    currencyUpdateInterval;

    componentDidMount() {
        const {
            setUser,
            user,
            fetchTaxonomiesStartAsync,
            fetchCurrenciesStartAsync,
            defaultCurrencyCode,
            otherCurrenciesCodes
        } = this.props;

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
                        // Use for testing to write app currencies
                        // await initAppCurrencies(snapShot.id);
                    });
                }
                return;
            }
            setUser(user);
        });

        if (user.id) {
            fetchTaxonomiesStartAsync(user.id);
            fetchCurrenciesStartAsync(user.id);
            if (defaultCurrencyCode && otherCurrenciesCodes) {
                console.log('defaultCurrencyCode', defaultCurrencyCode);
                updateAppCurrenciesRates(user.id, defaultCurrencyCode, otherCurrenciesCodes).then(() => {
                    this.currencyUpdateInterval = setInterval(() => {
                        const {defaultCurrencyCode, otherCurrenciesCodes} = this.props;
                        console.log('defaultCurrencyCode', defaultCurrencyCode);
                        updateAppCurrenciesRates(user.id, defaultCurrencyCode, otherCurrenciesCodes).then(() => {
                            console.log('Currencies rates updated');
                        });
                    }, 3600000);
                });
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.currencyUpdateInterval);
        this.unsubscribeFromAuth();
    }

    render() {
        let {user} = this.props;
        // console.log('defaultCurrencyCode');
        // console.log(defaultCurrencyCode);

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
    user: selectUser(state),
    defaultCurrencyCode: selectDefaultCurrencyCode(state),
    otherCurrenciesCodes: selectOtherCurrenciesCodes(state)
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    fetchTaxonomiesStartAsync: userId => dispatch(fetchTaxonomiesStartAsync(userId)),
    fetchCurrenciesStartAsync: userId => dispatch(fetchCurrenciesStartAsync(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
