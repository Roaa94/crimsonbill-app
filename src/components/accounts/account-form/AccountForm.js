import React, {Component} from 'react';
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Select from "../../ui/inputs/Select";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import TextField from "@material-ui/core/TextField";
import {selectAccount} from "../../../redux/accounts/accounts.selectors";
import {selectTaxonomyArray} from "../../../redux/taxonomies/taxonomies.selectors";
import CurrencySelect from "../../ui/inputs/CurrencySelect";
import {addAccountDocument, updateAccountDocument} from "../../../firebase/accounts.firebase-utils";

class AccountForm extends Component {
    _isMounted = false;

    state = {
        typeId: '',
        name: '',
        currencyCode: '',
        notes: '',
    };

    componentDidMount() {
        this._isMounted = true;
        const {accountId, account} = this.props;
        if (accountId && account) {
            let {typeId, name, currencyCode, notes} = account;
            if (this._isMounted) {
                this.setState({
                    typeId,
                    name,
                    currencyCode,
                    notes
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {userId, accountId, handleFormCancel} = this.props;
        const accountData = this.state;
        if (accountId) {
            await updateAccountDocument(userId, accountId, accountData);
        } else {
            await addAccountDocument(userId, accountData);
        }

        if (this._isMounted) {
            this.setState({
                typeId: '',
                name: '',
                currencyCode: '',
                notes: '',
            });
        }
        handleFormCancel();
    };

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {typeId, name, currencyCode, notes} = this.state;
        const {handleFormCancel, accountTypes} = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Account Name'
                            value={name}
                            name='name'
                            type='text'
                            required
                            onChange={this.handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Select
                            label='Type'
                            name='typeId'
                            value={typeId}
                            menuItems={accountTypes}
                            onChange={this.handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CurrencySelect
                            label='Currency'
                            name='currencyCode'
                            value={currencyCode}
                            handleChange={this.handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Notes'
                            value={notes}
                            name='notes'
                            type='text'
                            multiline
                            rows={3}
                            onChange={this.handleFieldChange}
                        />
                    </Grid>
                </Grid>
                <Box my={2}>
                    <Grid container>
                        <Button
                            fullWidth={false}
                            type='submit'
                            bgColor={colors.secondary}
                            prefixIcon={<CheckRoundedIcon/>}
                            margin='0 20px 0px 0'
                        >
                            Submit
                        </Button>
                        <Button
                            bgColor={colors.primary}
                            fullWidth={false}
                            onClick={handleFormCancel}
                            prefixIcon={<ClearRoundedIcon/>}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    account: selectAccount(ownProps.accountId)(state),
    accountTypes: selectTaxonomyArray('accountTypes')(state),
});

export default connect(mapStateToProps)(AccountForm);