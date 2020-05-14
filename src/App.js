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
import {fetchTaxonomiesStartAsync} from "./redux/settings/settings.actions";
// import {initDefaultTaxonomies} from "./firebase/taxonomies.firebase-utils";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setUser, user, fetchTaxonomiesStartAsync} = this.props;
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
        if(user.id) {
            fetchTaxonomiesStartAsync(user.id);
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
    user: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    fetchTaxonomiesStartAsync: userId => dispatch(fetchTaxonomiesStartAsync(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
