import React from 'react';
import {Link} from "react-router-dom";
import AppTextField from "../ui/AppTextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AppButton from "../ui/AppButton";
import {signInWithGoogle} from "../../firebase/firebase.utils";

class SignInForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
        console.log(this.state);
    };

    render() {

        return (
            <div>
                <h1>I Already Have An Account</h1>
                <p>Sign in with email and password</p>
                <form>
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
                    <Box mb={2}>
                        <Grid container justify='space-between' spacing={2}>
                            <Grid item xs={12} md={4}>
                                <AppButton>SIGN IN</AppButton>
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