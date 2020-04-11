import React, {Component} from 'react';
import PageWrapper from "../components/ui/PageWrapper";
import {addUserAccountDocument, updateUserAccountDocument} from "../firebase/accounts.utils";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import {selectCurrentUser} from "../redux/user/user.selectors";
import {updateUserAccounts} from "../redux/user/user.actions";
import {connect} from "react-redux";
import {firestore} from "../firebase/firebase.utils";

class AccountFormPage extends Component {
    state = {
        type: '',
        name: '',
        currency: '',
        details: '',
    };

    componentDidMount() {
        const {match, currentUser} = this.props;
        const accountId = match.params.accountId;
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
        let {currentUser, updateAccounts, history, match} = this.props;
        const accountId = match.params.accountId;
        const accountData = this.state;
        if (accountId) {
            const accountRef = await updateUserAccountDocument(currentUser.id, accountId, accountData);
            if(accountRef) {
                accountRef.onSnapshot(snapShot => {
                    console.log('snapShot.data()');
                    console.log(snapShot.data());
                });
            }
        } else {
            const accountRef = await addUserAccountDocument(currentUser.id, accountData);
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
        }
        history.goBack();
    };

    handleTextFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {type, name, currency, details} = this.state;
        const accountId = this.props.match.params.accountId;

        return (
            <PageWrapper>
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
                    <Button type='submit'>{accountId ? 'Edit Account' : 'Add Account'}</Button>
                </form>
            </PageWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    updateAccounts: accounts => dispatch(updateUserAccounts(accounts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormPage);