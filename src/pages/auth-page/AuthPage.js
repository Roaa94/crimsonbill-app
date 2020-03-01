import React, {Component} from 'react';
import {Container, Grid} from '@material-ui/core';
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/SignUpForm";
import AuthAnimation from "../../components/auth/AuthAnimation";

class AuthPage extends Component {
    render() {
        const containerStyle = {
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
        };

        let {toSignUp} = this.props;

        return (
            <Container style={containerStyle}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={5}>
                        {
                            toSignUp ? <SignUpForm/> : <SignInForm/>
                        }
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