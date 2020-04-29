import React, {Component} from 'react';
import {addOrUpdateUserAccountDocument} from "../../../firebase/accounts.firebase-utils";
import TextFieldFilled from "../../ui/inputs/text-field/TextFieldFilled";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {firestore} from "../../../firebase/firebase.utils";
import {createStructuredSelector} from "reselect";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Select from "../../ui/inputs/select/Select.component";
import {currencies, types} from "../../../data";
import Button from "../../ui/buttons/button-filled/Button.component";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {fetchBalancesStartAsync} from "../../../redux/accounts/accounts.actions";

class AccountForm extends Component {
    _isMounted = false;

    state = {
        type: '',
        name: '',
        currency: '',
        notes: '',
        totalBalance: 0.0,
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
        await addOrUpdateUserAccountDocument(userId, accountId, accountData);

        this.setState({
            type: '',
            name: '',
            currency: '',
            notes: '',
            totalBalance: 0.0,
        });
        fetchBalancesStartAsync(userId, accountId);
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
                <Grid container>
                    <Button
                        fullWidth={false}
                        type='submit'
                        bgColor={colors.info}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 0 0'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.secondary}
                        fullWidth={false}
                        onClick={handleFormCancel}
                        prefixIcon={<ClearRoundedIcon/>}
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