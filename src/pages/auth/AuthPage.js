import React, {Component} from 'react';
import {Container, Grid} from '@material-ui/core';
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/SignUpForm";
import AuthAnimation from "../../components/auth/AuthAnimation";
import {Route, Switch} from "react-router-dom";

class AuthPage extends Component {
    render() {
        const containerStyle = {
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
        };

        return (
            <Container style={containerStyle}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={5}>
                        <Switch>
                            <Route exact path='/' component={SignInForm}/>
                            <Route exact path='/sign-up' component={SignUpForm}/>
                        </Switch>
                    </Grid>
                    <Grid item md={2}/>
                    <Grid item xs={12} md={5}>
                        <AuthAnimation/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default AuthPage;