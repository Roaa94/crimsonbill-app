import React from 'react';
import './App.css';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {Redirect, Route, Switch} from "react-router-dom";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {setCurrentUser} from "./redux/user/user.actions";
import {connect} from "react-redux";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user);
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                });
            }
            setCurrentUser(user);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        let {currentUser} = this.props;

        return (
            <Switch>
                <Route exact path='/' render={
                    () => currentUser ? <Redirect to='/home'/> : <AuthPage/>
                }/>
                <Route exact path='/sign-up' render={
                    () => currentUser ? <Redirect to='/home'/> : <AuthPage/>
                }/>
                <Route path='/home' render={
                    () => currentUser ?  <HomePage path='/home'/> : <Redirect to='/'/>
                }/>
            </Switch>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
