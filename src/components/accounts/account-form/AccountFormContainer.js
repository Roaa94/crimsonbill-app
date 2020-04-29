import React from 'react';
import {
    AccountFormExpansionPanel,
    AccountFormExpansionPanelContent,
    AccountFormExpansionPanelSummary
} from "./AccountForm.styles";
import {createStructuredSelector} from "reselect";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";
import AccountForm from "./AccountForm";
import {toggleAccountForm} from "../../../redux/account-form/account-form.actions";

const AccountFormContainer = ({accountFormShow, toggleAccountForm}) => {

    return (
        <AccountFormExpansionPanel expanded={accountFormShow}>
            <AccountFormExpansionPanelSummary/>
            <AccountFormExpansionPanelContent>
                <h3>Add Account</h3>
                <AccountForm handleFormCancel={() => toggleAccountForm(false)}/>
            </AccountFormExpansionPanelContent>
        </AccountFormExpansionPanel>
    );
};

const mapStateToProps = createStructuredSelector({
    accountFormShow: selectAccountFormShow,
});

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormContainer);
