import React from 'react';
import {Link} from "react-router-dom";
import AppTextField from "../ui/AppTextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AppButton from "../ui/AppButton";
import {signInWithGoogle} from "../../firebase/firebase.utils";

class SignUpForm extends React.Component {
    state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <h1>I Don't Have An Account</h1>
                <p>Sign up with email and password</p>
                <form>
                    <AppTextField
                        label='Display Name'
                        name='displayName'
                        type='text'
                        onChange={this.handleChange}
                    />
                    <AppTextField
                        label='Email'
                        name='email'
                        type='text'
                        onChange={this.handleChange}
                    />
                    <AppTextField
                        label='Password'
                        name='password'
                        type='password'
                        onChange={this.handleChange}
                    />
                    <AppTextField
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        onChange={this.handleChange}
                    />
                    <Box mb={2}>
                        <Grid container justify='space-between' spacing={2}>
                            <Grid item xs={12} md={4}>
                                <AppButton>SIGN UP</AppButton>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <AppButton color='secondary' onClick={signInWithGoogle}>
                                    SIGN IN WITH GOOGLE
                                </AppButton>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
                <Link to='/'>Already have an account? Sign in</Link>
            </div>
        );
    }
}

export default SignUpForm;