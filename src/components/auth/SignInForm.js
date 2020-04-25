import React from 'react';
import {Link} from "react-router-dom";
import TextFieldOutline from "../ui/TextFieldOutline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "../ui/Button";
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
                    <TextFieldOutline
                        label='Email'
                        name='email'
                        value={email}
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <TextFieldOutline
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
                                <Button type='submit'>SIGN IN</Button>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Button color='secondary' onClick={signInWithGoogle}>
                                    SIGN IN WITH GOOGLE
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
                <Link to='/sign-up'>
                    Don't have an account? Sign up
                </Link>
            </div>
        );
    }
}

export default SignInForm;