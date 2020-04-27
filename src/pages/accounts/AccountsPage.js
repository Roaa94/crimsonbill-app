import React from 'react';
import PageWrapper from "../../components/ui/layout/PageWrapper";
import {selectUserAccounts, selectUserAuthData} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import AddAccountView from "../../components/accounts/AddAccountView";
import {selectAccountFormShow} from "../../redux/account-form/account-form.selectors";
import {createStructuredSelector} from "reselect";
import {toggleAccountForm} from "../../redux/account-form/account-form.actions";
import {AccountsPageHeader} from "./AccountsPage.styles";
import AccountCard from "../../components/accounts/account-card/AccountCard.component";
import AddIconButton from "../../components/ui/buttons/AddIconButton";
import AccountFormContainer from "../../components/accounts/account-form/AccountFormContainer";
// import WithLoader from "../../components/HOC/WithLoader";
import {setUserAccounts} from "../../redux/user/user.actions";
import {convertAccountsCollectionToArray} from "../../firebase/accounts.utils";
import {firestore} from "../../firebase/firebase.utils";

// const AccountsListWithLoader = WithLoader(({children}) => <div>{children}</div>);

class AccountsPage extends React.Component {

    componentDidMount() {
        const {setUserAccounts, user} = this.props;
        const accountsRef = firestore.collection(`users/${user.id}/accounts`);
        accountsRef.onSnapshot(async accountsSnapshot => {
            let accountsArray = convertAccountsCollectionToArray(accountsSnapshot, user.id);
            setUserAccounts(accountsArray);
        });
    }

    render() {
        let {accountFormShow, toggleAccountForm, accounts} = this.props;
        let hasAccounts = accounts && accounts.length > 0;
        console.log('accounts');
        console.log(accounts);
        return (
            <PageWrapper>
                {
                    hasAccounts ?
                        <AccountsPageHeader>
                            <h3>Accounts</h3>
                            <AddIconButton handleClick={() => toggleAccountForm(true)} disabled={accountFormShow} />
                        </AccountsPageHeader>
                        : null
                }
                <AccountFormContainer/>
                {
                    hasAccounts
                        ? <div>
                            {
                                accounts.map(({id, ...accountDetails}) => (
                                    <AccountCard id={id} {...accountDetails} key={id}/>
                                ))
                            }
                        </div>
                        : accountFormShow ? null : <AddAccountView/>
                }
            </PageWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUserAuthData,
    accounts: selectUserAccounts,
    accountFormShow: selectAccountFormShow,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
    setUserAccounts: accountsArray => dispatch(setUserAccounts(accountsArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);