import React from 'react';
import {addOrUpdateBalanceDocument} from "../../firebase/balances.firebase-utils";
import {selectUserId} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "../ui/buttons/Button";
import {colors} from "../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Box from "@material-ui/core/Box";
import {selectBalance} from "../../redux/accounts/accounts.selectors";
import {selectAppCurrencies} from "../../redux/currencies/currencies.selectors";
import CurrencySelect from "../ui/inputs/CurrencySelect";

class BalanceForm extends React.Component {
    _isMounted = false;

    state = {
        name: '',
        currencyCode: '',
    };

    componentDidMount() {
        this._isMounted = true;
        const {balanceId, balance} = this.props;
        if (balanceId && balance) {
            let {name, currencyCode} = balance;
            if (this._isMounted) {
                this.setState({
                    name,
                    currencyCode,
                });
            }
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
            currencyCode: '',
        });
        handleFormCancel();
    };

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        let {handleFormCancel, appCurrencies} = this.props;
        let {name, currencyCode} = this.state;

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
                            <CurrencySelect
                                label='Currency'
                                name='currencyCode'
                                value={currencyCode}
                                menuItems={appCurrencies}
                                onChange={this.handleFieldChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container>
                    <Button
                        fullWidth={false}
                        type='submit'
                        bgColor={colors.secondary}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 20px 0'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.primary}
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

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    balance: selectBalance(ownProps.accountId, ownProps.balanceId)(state),
    appCurrencies: selectAppCurrencies(state),
});

export default connect(mapStateToProps)(BalanceForm);
