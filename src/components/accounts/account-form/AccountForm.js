import React, {Component} from 'react';
import {addOrUpdateAccountDocument} from "../../../firebase/accounts.firebase-utils";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Select from "../../ui/inputs/Select";
import {currencies, types} from "../../../data";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import TextField from "@material-ui/core/TextField";
import {selectAccount} from "../../../redux/accounts/accounts.selectors";

class AccountForm extends Component {
    _isMounted = false;

    state = {
        type: '',
        name: '',
        currency: '',
        notes: '',
    };

    componentDidMount() {
        this._isMounted = true;
        const {accountId, account} = this.props;
        if (accountId && account) {
            let {type, name, currency, notes} = account;
            if (this._isMounted) {
                this.setState({
                    type,
                    name,
                    currency,
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
        await addOrUpdateAccountDocument(userId, accountId, accountData);

        this.setState({
            type: '',
            name: '',
            currency: '',
            notes: '',
        });
        handleFormCancel();
    };

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {type, name, currency, notes} = this.state;
        const {handleFormCancel} = this.props;

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
                    <Grid item xs={12} md={3}>
                        <Select
                            label='Type'
                            name='type'
                            value={type}
                            menuItems={types}
                            onChange={this.handleFieldChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Select
                            label='Currency'
                            name='currency'
                            value={currency}
                            menuItems={currencies}
                            onChange={this.handleFieldChange}
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
});

export default connect(mapStateToProps)(AccountForm);