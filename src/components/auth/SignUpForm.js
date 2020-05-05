import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TextFieldOutlined from "../ui/inputs/TextFieldOutlined";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ButtonOutlined from "../ui/buttons/ButtonOutlined";
import {auth, signInWithGoogle} from "../../firebase/firebase.utils";
import {createUserProfileDocument} from "../../firebase/user.firebase-utils";

class SignUpForm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert('Passwords don\'t match!');
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            if (this._isMounted) {
                this.setState({
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }); // to clear the form
            }
        } catch (error) {
            alert(error.message);
            console.log('An error occurred', error.message);
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <div>
                <h1>I Don't Have An Account</h1>
                <p>Sign up with email and password</p>
                <form onSubmit={this.handleSubmit}>
                    <TextFieldOutlined
                        label='Display Name'
                        value={displayName}
                        name='displayName'
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <TextFieldOutlined
                        label='Email'
                        name='email'
                        value={email}
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <TextFieldOutlined
                        label='Password'
                        name='password'
                        value={password}
                        type='password'
                        onChange={this.handleChange}
                        required
                    />
                    <TextFieldOutlined
                        label='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        type='password'
                        onChange={this.handleChange}
                        required
                    />
                    <Box mb={2}>
                        <Grid container justify='space-between' spacing={2}>
                            <Grid item xs={12} md={4}>
                                <ButtonOutlined type='submit'>SIGN UP</ButtonOutlined>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ButtonOutlined color='secondary' onClick={signInWithGoogle}>
                                    SIGN IN WITH GOOGLE
                                </ButtonOutlined>
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