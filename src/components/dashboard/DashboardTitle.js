import React from 'react';
import {selectUserDisplayName} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import DefaultCurrencySelect from "../currencies/DefaultCurrencySelect";

const DashboardTitle = ({userDisplayName}) => {
    return (
        <Grid container spacing={3} alignItems='center'>
            <Grid item>
                <h1 className='light'>Welcome {userDisplayName}!</h1>
            </Grid>
            <Grid item xs={12} md={2}>
                <DefaultCurrencySelect/>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    userDisplayName: selectUserDisplayName(state),
})

export default connect(mapStateToProps)(DashboardTitle);
