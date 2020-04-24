import React from 'react';
import PageWrapper from "../../components/ui/PageWrapper";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {firestore} from "../../firebase/firebase.utils";
import {convertAccountsCollectionToArray} from "../../firebase/accounts.utils";
import {updateUserAccounts} from "../../redux/user/user.actions";
import {ReactComponent as Loader} from '../../assets/svg/loader.svg';
import AccountForm from "../../components/accounts/account-form/AccountForm.component";
import {selectAccountFormShow} from "../../redux/account-form/account-form.selectors";
import {createStructuredSelector} from "reselect";
import {toggleAccountForm} from "../../redux/account-form/account-form.actions";
import {AccountsPageHeader} from "./AccountsPage.styles";
import AccountCard from "../../components/accounts/account-card/AccountCard.component";

class AccountsPage extends React.Component {
    _isMounted = false;

    state = {
        loadingAccounts: true,
    };

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loadingAccounts: true});
        }
        let {currentUser, updateAccounts} = this.props;
        const accountsRef = firestore.collection(`users/${currentUser.id}/accounts`);
        accountsRef.onSnapshot(async accountsSnapshot => {
            let accountsArray = convertAccountsCollectionToArray(accountsSnapshot);
            await updateAccounts(accountsArray);
            if (this._isMounted) {
                this.setState({loadingAccounts: false});
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {currentUser, accountFormShow, toggleAccountForm} = this.props;
        let {loadingAccounts} = this.state;
        let hasAccounts = currentUser.accounts && currentUser.accounts.length > 0;

        if (loadingAccounts) {
            return (
                <PageWrapper>
                    <Loader/>
                </PageWrapper>
            );
        } else {
            return (
                <PageWrapper>
                    {
                        accountFormShow ? <AccountForm/> : <div/>
                    }
                    {
                        hasAccounts
                            ? <div>
                                <AccountsPageHeader>
                                    <h3>Accounts</h3>
                                    <button onClick={() => toggleAccountForm(true)}>Add Account</button>
                                </AccountsPageHeader>
                                {
                                    currentUser.accounts.map(({id, ...accountDetails}) => (
                                        <AccountCard id={id} {...accountDetails} key={id}/>
                                    ))
                                }
                            </div>
                            : accountFormShow ? <div/> : <AddAccountView/>
                    }
                </PageWrapper>
            );
        }
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    accountFormShow: selectAccountFormShow,
});

const mapDispatchToProps = dispatch => ({
    updateAccounts: accounts => dispatch(updateUserAccounts(accounts)),
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);