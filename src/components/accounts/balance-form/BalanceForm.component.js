import React from 'react';
import {addOrUpdateBalanceDocument} from "../../../firebase/balances.firebase-utils";
import {createStructuredSelector} from "reselect";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextFieldFilled from "../../ui/inputs/text-field/TextFieldFilled";
import Select from "../../ui/inputs/select/Select.component";
import {currencies} from "../../../data";
import Button from "../../ui/buttons/button-filled/Button.component";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Box from "@material-ui/core/Box";

class BalanceForm extends React.Component {
    state = {
        name: '',
        currency: '',
    };

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
                            <TextFieldFilled
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

export default connect(mapStateToProps)(BalanceForm);
