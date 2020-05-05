import React from 'react';
import {selectAccountName, selectBalanceName} from "../../../redux/accounts/accounts.selectors";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TransactionArrow from "../transaction-form/TransactionArrow";
import withStyles from "@material-ui/core/styles/withStyles";
import {borderRadius, colors} from "../../../styles/global";

const AccountInfoContainer = withStyles({
    root: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.m,
        margin: '8px',
    }
})(props => (
    <Grid
        item
        container
        direction='column'
        justify='center'
        xs={12}
        md
        spacing={1}
        {...props}
    />
));

const AccountInfoLine = withStyles({
    root: {
        '& .bold': {
            fontWeight: 600,
        }
    }
})(props => (
    <Grid
        item
        container
        spacing={1}
        {...props}
    />
));

const AccountToAccountView = ({isSpending, accountName, balanceName, targetAccountName, targetBalanceName}) => {
    return (
        <Grid container justify='space-between' alignItems='stretch' spacing={2}>
            <AccountInfoContainer>
                <Grid item>
                    <Box fontWeight='600'>
                        <Typography color={isSpending ? 'primary' : 'secondary'}>
                            {isSpending ? 'From' : 'To'}
                        </Typography>
                    </Box>
                </Grid>
                <AccountInfoLine>
                    <Grid item>
                        Account:
                    </Grid>
                    <Grid item className='bold'>
                        {accountName}
                    </Grid>
                </AccountInfoLine>
                <AccountInfoLine>
                    <Grid item>
                        Balance:
                    </Grid>
                    <Grid item className='bold'>
                        {balanceName}
                    </Grid>
                </AccountInfoLine>
            </AccountInfoContainer>
            <Grid container justify='center' alignItems='center' item xs={12} md>
                <TransactionArrow isSpending={isSpending}/>
            </Grid>
            <AccountInfoContainer>
                <Grid item>
                    <Typography color={isSpending ? 'secondary' : 'primary'}>
                        {isSpending ? 'To' : 'From'}
                    </Typography>
                </Grid>
                <AccountInfoLine>
                    <Grid item>
                        Account:
                    </Grid>
                    <Grid item className='bold'>
                        {targetAccountName}
                    </Grid>
                </AccountInfoLine>
                <AccountInfoLine>
                    <Grid item>
                        Balance:
                    </Grid>
                    <Grid item className='bold'>
                        {targetBalanceName}
                    </Grid>
                </AccountInfoLine>
            </AccountInfoContainer>
        </Grid>
    );
};

const mapStateToProps = (state, ownProps) => ({
    accountName: selectAccountName(ownProps.accountId)(state),
    balanceName: selectBalanceName(ownProps.accountId, ownProps.balanceId)(state),
    targetAccountName: selectAccountName(ownProps.targetAccountId)(state),
    targetBalanceName: selectBalanceName(ownProps.targetAccountId, ownProps.targetBalanceId)(state),
});

export default connect(mapStateToProps)(AccountToAccountView);
