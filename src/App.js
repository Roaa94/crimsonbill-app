import React from 'react';
import './App.css';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {Redirect, Route, Switch} from "react-router-dom";
import {setUser} from "./redux/user/user.actions";
import {connect} from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/home/HomePage";
import {selectUser} from "./redux/user/user.selectors";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user);
                if (userRef) {
                    userRef.onSnapshot(snapShot => {
                        setUser({
                            id: snapShot.id,
                            ...snapShot.data(),
                        });

                    });
                }
                return;
            }
            setUser(user);
        })
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
    setUser: user => dispatch(setUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
