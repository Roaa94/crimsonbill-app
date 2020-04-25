import React, {Component} from 'react';
import {addOrUpdateUserAccountDocument} from "../../../firebase/accounts.utils";
import TextFieldOutline from "../../ui/TextFieldOutline";
import Button from "../../ui/Button";
import {selectUser} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {firestore} from "../../../firebase/firebase.utils";
import {toggleAccountForm} from "../../../redux/account-form/account-form.actions";
import {
    AccountFormExpansionPanelSummary,
    AccountFormExpansionPanel,
    AccountFormExpansionPanelContent
} from "./AccountForm.styles";
import {createStructuredSelector} from "reselect";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";

class AccountForm extends Component {
    state = {
        type: '',
        name: '',
        currency: '',
        notes: '',
        balance: 0.0,
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
            balance: 0.0,
        });
        toggleAccountForm(false);
    };

    handleTextFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    render() {
        const {type, name, currency, notes} = this.state;
        const {accountId, toggleAccountForm, accountFormShow} = this.props;

        return (
            <AccountFormExpansionPanel expanded={accountFormShow}>
                <AccountFormExpansionPanelSummary/>
                <AccountFormExpansionPanelContent>
                    <h3>Add Account</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <TextFieldOutline
                            label='Account Type'
                            value={type}
                            name='type'
                            type='text'
                            onChange={this.handleTextFieldChange}
                        />
                        <TextFieldOutline
                            label='Account Name'
                            value={name}
                            name='name'
                            type='text'
                            onChange={this.handleTextFieldChange}
                        />
                        <TextFieldOutline
                            label='Account Currency'
                            value={currency}
                            name='currency'
                            type='text'
                            onChange={this.handleTextFieldChange}
                        />
                        <TextFieldOutline
                            label='Notes'
                            value={notes}
                            name='notes'
                            type='text'
                            onChange={this.handleTextFieldChange}
                        />
                        <Button type='submit'>{accountId ? 'Edit Account' : 'Add Account'}</Button>
                        <Button onClick={() => toggleAccountForm(false)}>Cancel</Button>
                    </form>
                </AccountFormExpansionPanelContent>
            </AccountFormExpansionPanel>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    accountFormShow: selectAccountFormShow,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);