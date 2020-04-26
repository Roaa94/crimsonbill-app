import React from 'react';
import {
    AccountFormExpansionPanel,
    AccountFormExpansionPanelContent,
    AccountFormExpansionPanelSummary
} from "./AccountForm.styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {createStructuredSelector} from "reselect";
import {selectAccountFormShow} from "../../../redux/account-form/account-form.selectors";
import {connect} from "react-redux";
import AccountForm from "./AccountForm.component";
import {toggleAccountForm} from "../../../redux/account-form/account-form.actions";

const AccountFormContainer = ({accountFormShow, toggleAccountForm}) => {

    return (
        <AccountFormExpansionPanel expanded={accountFormShow}>
            <AccountFormExpansionPanelSummary/>
            <AccountFormExpansionPanelContent>
                <Box mb={2}>
                    <Grid container justify='space-between' alignItems='center'>
                        <h3>Add Account</h3>
                    </Grid>
                </Box>
                <AccountForm handleFormCancel={() => toggleAccountForm(false)} />
            </AccountFormExpansionPanelContent >
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
