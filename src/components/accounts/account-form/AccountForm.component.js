import React, {Component} from 'react';
import {addUserAccountDocument, updateUserAccountDocument} from "../../../firebase/accounts.utils";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import {selectCurrentUser} from "../../../redux/user/user.selectors";
import {updateUserAccounts} from "../../../redux/user/user.actions";
import {connect} from "react-redux";
import {firestore} from "../../../firebase/firebase.utils";
import {toggleAccountForm} from "../../../redux/account-form/account-form.actions";

class AccountForm extends Component {
    state = {
        type: '',
        name: '',
        currency: '',
        notes: '',
    };

    componentDidMount() {
        const {currentUser, accountId} = this.props;
        if (accountId) {
            const userAccountRef = firestore.doc(`users/${currentUser.id}/accounts/${accountId}`);
            userAccountRef.onSnapshot(snapShot => {
                let accountData = snapShot.data();
                this.setState(accountData);
            })
        }
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {currentUser, updateAccounts, accountId, toggleAccountForm} = this.props;
        const accountData = this.state;
        if (accountId) {
            const accountRef = await updateUserAccountDocument(currentUser.id, accountId, accountData);
            if (accountRef) {
                accountRef.onSnapshot(snapShot => {
                    console.log('snapShot.data()');
                    console.log(snapShot.data());
                });
            }
        } else {
            const accountRef = await addUserAccountDocument(currentUser.id, accountData);
            let hasAccounts = currentUser.accounts && currentUser.accounts.length > 0;
            if (accountRef) {
                accountRef.onSnapshot(snapshot => {
                    console.log('snapshot.data()');
                    console.log(snapshot.id);
                    console.log(snapshot.data());
                    let newAccount = snapshot.data();
                    let userAccounts = hasAccounts ? [...currentUser.accounts, newAccount] : [newAccount];
                    updateAccounts(userAccounts);
                });
            }
            this.setState({
                type: '',
                name: '',
                currency: '',
                notes: '',
            });
        }
        toggleAccountForm(false);
    };

    handleTextFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {type, name, currency, notes} = this.state;
        const {accountId, toggleAccountForm} = this.props;

        return (
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
                    label='Notes'
                    value={notes}
                    name='notes'
                    type='text'
                    onChange={this.handleTextFieldChange}
                />
                <Button type='submit'>{accountId ? 'Edit Account' : 'Add Account'}</Button>
                <Button onClick={() => toggleAccountForm(false)}>'Cancel'</Button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    updateAccounts: accounts => dispatch(updateUserAccounts(accounts)),
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);