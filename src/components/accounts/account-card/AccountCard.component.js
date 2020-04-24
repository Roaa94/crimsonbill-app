import React from 'react';
import {deleteUserAccountDocument} from "../../../firebase/accounts.utils";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../../redux/user/user.selectors";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";

class AccountCard extends React.Component {

    deleteAccount = async (accountId) => {
        let {currentUser} = this.props;
        await deleteUserAccountDocument(currentUser.id, accountId);
    };

    render() {
        let {id, type, name, currency, details} = this.props;
        console.log(`account id: ${id}`);

        return (
            <div>
                <p>Type: {type}</p>
                <p>Name: {name}</p>
                <p>Currency: {currency}</p>
                <p>Details: {details}</p>
                <button onClick={() => this.deleteAccount(id)}>Delete</button>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    accountFormShow: selectAccountFormShow,
});

export default connect(mapStateToProps)(AccountCard);
