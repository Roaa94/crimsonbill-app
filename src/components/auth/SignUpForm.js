import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AppTextField from "../ui/AppTextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AppButton from "../ui/AppButton";
import {auth, createUserProfileDocument, signInWithGoogle} from "../../firebase/firebase.utils";

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword) {
            alert('Passwords don\'t match!');
            return;
        }

        try {
            console.log('displayName');
            console.log(displayName);
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, displayName);
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }); // to clear the form
        } catch (error) {
            alert(error.message);
            console.log('An error occurred', error.message);
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <div>
                <h1>I Don't Have An Account</h1>
                <p>Sign up with email and password</p>
                <form onSubmit={this.handleSubmit}>
                    <AppTextField
                        label='Display Name'
                        value={displayName}
                        name='displayName'
                        type='text'
                        onChange={this.handleChange}
                    />
                    <AppTextField
                        label='Email'
                        name='email'
                        value={email}
                        type='text'
                        onChange={this.handleChange}
                    />
                    <AppTextField
                        label='Password'
                        name='password'
                        value={password}
                        type='password'
                        onChange={this.handleChange}
                    />
                    <AppTextField
                        label='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        type='password'
                        onChange={this.handleChange}
                    />
                    <Box mb={2}>
                        <Grid container justify='space-between' spacing={2}>
                            <Grid item xs={12} md={4}>
                                <AppButton type='submit'>SIGN UP</AppButton>
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