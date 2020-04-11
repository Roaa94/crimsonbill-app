import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

export const transactionDrawerWidth = 320;

const useStyles = makeStyles(() => ({
    drawer: {
        width: transactionDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: transactionDrawerWidth,
        padding: '30px 20px',
    },
}));

const TransactionsDrawer = ({open}) => {
    const classes = useStyles();

    return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <h3>Latest Transactions</h3>
            </Drawer>
    );
};

export default TransactionsDrawer;