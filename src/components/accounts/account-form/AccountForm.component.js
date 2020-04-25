import React, {Component} from 'react';
import {addOrUpdateUserAccountDocument} from "../../../firebase/accounts.utils";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import {selectUser} from "../../../redux/user/user.selectors";
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
        const {user, accountId} = this.props;
        if (accountId) {
            const userAccountRef = firestore.doc(`users/${user.id}/accounts/${accountId}`);
            userAccountRef.onSnapshot(snapShot => {
                let accountData = snapShot.data();
                this.setState(accountData);
            })
        }
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {user, accountId, toggleAccountForm} = this.props;
        const accountData = this.state;
        await addOrUpdateUserAccountDocument(user.id, accountId, accountData);

        this.setState({
            type: '',
            name: '',
            currency: '',
            notes: '',
        });
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
                <Button onClick={() => toggleAccountForm(false)}>Cancel</Button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);