import React, {Component} from 'react';
import {ReactComponent as AuthArtwork} from '../../assets/images/woman-working.svg';
import {Container, Grid} from '@material-ui/core';
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/SignUpForm";

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
                        <AuthArtwork/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default AuthPage;