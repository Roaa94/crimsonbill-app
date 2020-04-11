import React, {Component} from 'react';
import TextField from "./ui/TextField";
import Button from "./ui/Button";
import {addUserAccountDocument} from "../firebase/accounts.utils";
import {selectCurrentUser} from "../redux/user/user.selectors";
import {connect} from "react-redux";
import {updateUserAccounts} from "../redux/user/user.actions";

class AddAccountForm extends Component {
    state = {
        type: '',
        name: '',
        currency: '',
        details: '',
    };

    handleFormSubmit = async event => {
        event.preventDefault();
        let {currentUser, updateAccounts} = this.props;
        const accountData = this.state;
        const accountRef = await addUserAccountDocument(currentUser, accountData);
        if (accountRef) {
            accountRef.onSnapshot(snapshot => {
                let newAccount = snapshot.data();
                let userAccounts = currentUser.accounts && currentUser.accounts.length > 0 ? [...currentUser.accounts, newAccount] : [newAccount];
                updateAccounts(userAccounts);
            });
        }
        this.setState({
            type: '',
            name: '',
            currency: '',
            details: '',
        });
    };

    handleTextFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {type, name, currency, details} = this.state;

        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <TextField
                        label='Account Type'
                        value={type}
                        name='type'
                        type='text'
                        onChange={this.handleTextFieldChange}
                    />
                    <TextField
                        label='Account Name'
                        value={name}
                        name='name'
                        type='text'
                        onChange={this.handleTextFieldChange}
                    />
                    <TextField
                        label='Account Currency'
                        value={currency}
                        name='currency'
                        type='text'
                        onChange={this.handleTextFieldChange}
                    />
                    <TextField
                        label='Details'
                        value={details}
                        name='details'
                        type='text'
                        onChange={this.handleTextFieldChange}
                    />
                    <Button type='submit'>Add Account</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    updateAccounts: accounts => dispatch(updateUserAccounts(accounts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountForm);