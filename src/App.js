import React from 'react';
import './App.css';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import DashboardPage from "./pages/dashboard-page/dashboard-page";
import {Redirect, Route, Switch} from "react-router-dom";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {setCurrentUser} from "./redux/user/user.actions";
import {connect} from "react-redux";
import AuthPage from "./pages/auth-page/auth-page";

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
                    }, () => {
                        console.log('current use from state', this.state.currentUser);
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
                <Route exact path='/dashboard' component={DashboardPage} />
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
