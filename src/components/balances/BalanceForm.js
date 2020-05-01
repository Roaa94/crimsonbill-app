import React from 'react';
import {addOrUpdateBalanceDocument} from "../../firebase/balances.firebase-utils";
import {createStructuredSelector} from "reselect";
import {selectUserId} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Select from "../ui/inputs/Select";
import TextField from "@material-ui/core/TextField";
import {currencies} from "../../data";
import Button from "../ui/buttons/Button";
import {colors} from "../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Box from "@material-ui/core/Box";
import {firestore} from "../../firebase/firebase.utils";

class BalanceForm extends React.Component {
    _isMounted = false;

    state = {
        name: '',
        currency: '',
    };

    componentDidMount() {
        this._isMounted = true;
        const {userId, accountId, balanceId} = this.props;
        if (balanceId) {
            const balanceRef = firestore.doc(`users/${userId}/accounts/${accountId}/balances/${balanceId}`);
            balanceRef.onSnapshot(snapShot => {
                let balanceData = snapShot.data();
                if (this._isMounted) {
                    this.setState(balanceData);
                }
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {userId, accountId, balanceId, handleFormCancel} = this.props;
        const balanceData = this.state;
        await addOrUpdateBalanceDocument(userId, accountId, balanceId, balanceData);

        this.setState({
            name: '',
            currency: '',
        });
        handleFormCancel();
    };

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        let {handleFormCancel} = this.props;
        let {name, currency} = this.state;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Box my={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label='Balance Name'
                                value={name}
                                name='name'
                                type='text'
                                required
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
                    </Grid>
                </Box>
                <Grid container>
                    <Button
                        fullWidth={false}
                        type='submit'
                        bgColor={colors.info}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 20px 0'
                        size='small'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.secondary}
                        fullWidth={false}
                        onClick={handleFormCancel}
                        prefixIcon={<ClearRoundedIcon/>}
                        margin='0 0 20px 0'
                        size='small'
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

export default connect(mapStateToProps)(BalanceForm);
