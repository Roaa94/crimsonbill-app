import React, {Component} from 'react';
import {addOrUpdateAccountDocument} from "../../../firebase/accounts.firebase-utils";
import TextFieldFilled from "../../ui/inputs/text-field/TextFieldFilled";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {firestore} from "../../../firebase/firebase.utils";
import {createStructuredSelector} from "reselect";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Select from "../../ui/inputs/select/Select";
import {currencies, types} from "../../../data";
import Button from "../../ui/buttons/button-filled/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {fetchBalancesStartAsync} from "../../../redux/accounts/accounts.actions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class AccountForm extends Component {
    _isMounted = false;

    state = {
        type: '',
        name: '',
        currency: '',
        notes: '',
        hasBalances: false,
    };

    componentDidMount() {
        this._isMounted = true;
        const {userId, accountId} = this.props;
        if (accountId) {
            const userAccountRef = firestore.doc(`users/${userId}/accounts/${accountId}`);
            userAccountRef.onSnapshot(snapShot => {
                let accountData = snapShot.data();
                if (this._isMounted) {
                    this.setState(accountData);
                }
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {userId, accountId, handleFormCancel, fetchBalancesStartAsync} = this.props;
        const accountData = this.state;
        await addOrUpdateAccountDocument(userId, accountId, accountData);

        this.setState({
            type: '',
            name: '',
            currency: '',
            notes: '',
            hasBalances: false,
        });
        fetchBalancesStartAsync(userId, accountId);
        handleFormCancel();
    };

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleCheckBoxChange = event => {
        this.setState({hasBalances: event.target.checked});
        console.log(this.state);
    }

    render() {
        const {type, name, currency, notes, hasBalances} = this.state;
        const {handleFormCancel} = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextFieldFilled
                            label='Account Name'
                            value={name}
                            name='name'
                            type='text'
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
                        <Box mb={2}>
                            <TextFieldFilled
                                label='Notes'
                                value={notes}
                                name='notes'
                                type='text'
                                multiline
                                rows={3}
                                onChange={this.handleFieldChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box mb={2}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasBalances}
                                onChange={this.handleCheckBoxChange}
                                name="hasBalances"
                                color="secondary"
                            />
                        }
                        label="Has Balances (Sub Accounts)"
                    />
                </Box>
                <Grid container>
                    <Button
                        fullWidth={false}
                        type='submit'
                        bgColor={colors.info}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 20px 0'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.secondary}
                        fullWidth={false}
                        onClick={handleFormCancel}
                        prefixIcon={<ClearRoundedIcon/>}
                        margin='0 0 20px 0'
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
});

const mapDispatchToProps = dispatch => ({
    fetchBalancesStartAsync: (userId, accountId) => dispatch(fetchBalancesStartAsync(userId, accountId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);