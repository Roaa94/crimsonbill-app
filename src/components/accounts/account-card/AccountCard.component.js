import React from 'react';
import {deleteUserAccountDocument} from "../../../firebase/accounts.utils";
import {createStructuredSelector} from "reselect";
import {selectUser} from "../../../redux/user/user.selectors";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";

class AccountCard extends React.Component {

    deleteAccount = async (accountId) => {
        let {user} = this.props;
        await deleteUserAccountDocument(user.id, accountId);
    };

    render() {
        let {id, type, name, currency, notes} = this.props;

        return (
            <div>
                <p>Type: {type}</p>
                <p>Name: {name}</p>
                <p>Currency: {currency}</p>
                <p>Notes: {notes}</p>
                <button onClick={() => this.deleteAccount(id)}>Delete</button>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    accountFormShow: selectAccountFormShow,
});

export default connect(mapStateToProps)(AccountCard);
