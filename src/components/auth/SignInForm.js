import React from 'react';
import {Link} from "react-router-dom";
import AppTextField from "../ui/AppTextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AppButton from "../ui/AppButton";
import {auth, signInWithGoogle} from "../../firebase/firebase.utils";

class SignInForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: ''
            });
        } catch (error) {
            alert(error.message);
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <h1>I Already Have An Account</h1>
                <p>Sign in with email and password</p>
                <form onSubmit={this.handleSubmit}>
                    <AppTextField
                        label='Email'
                        name='email'
                        value={email}
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <AppTextField
                        label='Password'
                        name='password'
                        value={password}
                        type='password'
                        onChange={this.handleChange}
                        required
                    />
                    <Box mb={2}>
                        <Grid container justify='space-between' spacing={2}>
                            <Grid item xs={12} md={4}>
                                <AppButton type='submit'>SIGN IN</AppButton>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <AppButton color='secondary' onClick={signInWithGoogle}>
                                    SIGN IN WITH GOOGLE
                                </AppButton>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
                <Link to='/signup'>
                    Don't have an account? Sign up
                </Link>
            </div>
        );
    }
}

export default SignInForm;