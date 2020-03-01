import React from 'react';
import './App.css';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {setCurrentUser} from "./redux/user/user.actions";
import {connect} from "react-redux";
import AuthPage from "./pages/auth-page/AuthPage";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        this._isMounted = true;
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
        return (
            <Switch>
                <Route exact path='/' render={
                    () => this.props.currentUser ? (<Redirect to='/dashboard'/>) : <AuthPage/>
                }/>
                <Route exact path='/signup' render={
                    () => this.props.currentUser ? (<Redirect to='/dashboard'/>) : <AuthPage toSignUp={true}/>
                }/>
                <Route exact path='/dashboard' render={
                    () => this.props.currentUser ? <DashboardPage/> : <AuthPage/>
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
