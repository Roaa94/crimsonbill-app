import React, {useState} from 'react';
import {Link} from "react-router-dom";
import TextFieldOutlined from "../ui/inputs/TextFieldOutlined";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ButtonOutlined from "../ui/buttons/ButtonOutlined";
import {auth, signInWithGoogle} from "../../utils/firebase/firebase.utils";

const SignInForm = () => {

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const {email, password} = userCredentials;

    const handleChange = event => {
        const {value, name} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials({
                email: '',
                password: ''
            });
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div>
            <h1>I Already Have An Account</h1>
            <p>Sign in with email and password</p>
            <form onSubmit={handleSubmit}>
                <TextFieldOutlined
                    label='Email'
                    name='email'
                    value={email}
                    type='text'
                    onChange={handleChange}
                    required
                />
                <TextFieldOutlined
                    label='Password'
                    name='password'
                    value={password}
                    type='password'
                    onChange={handleChange}
                    required
                />
                <Box mb={2}>
                    <Grid container justify='space-between' spacing={2}>
                        <Grid item xs={12} md={4}>
                            <ButtonOutlined type='submit'>SIGN IN</ButtonOutlined>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <ButtonOutlined color='secondary' onClick={signInWithGoogle}>
                                SIGN IN WITH GOOGLE
                            </ButtonOutlined>
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

export default SignInForm;