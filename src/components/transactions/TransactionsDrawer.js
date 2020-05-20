import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {ReactComponent as FolderCabinetSVG} from '../../assets/svg/folder-cabinet.svg';
import {selectHasTransactions, selectIsFetchingTransactions} from "../../redux/transactions/transactions.selectors";
import {connect} from "react-redux";
import WithLoader from "../HOC/WithLoader";

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
    svgImage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '80%',
    }
}));

const TransactionsDrawerContentWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const TransactionsDrawer = ({open, hasTransactions, isFetchingTransactions}) => {
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
            <TransactionsDrawerContentWithLoader loading={isFetchingTransactions}>
                <h3>Latest Transactions</h3>
                {
                    hasTransactions ? (
                        <p>You have transactions dude!</p>
                    ) : (
                        <React.Fragment>
                            <p>No Transactions to Display</p>
                            <FolderCabinetSVG className={classes.svgImage}/>
                        </React.Fragment>
                    )
                }
            </TransactionsDrawerContentWithLoader>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    isFetchingTransactions: selectIsFetchingTransactions(state),
    hasTransactions: selectHasTransactions(state),
});

export default connect(mapStateToProps)(TransactionsDrawer);