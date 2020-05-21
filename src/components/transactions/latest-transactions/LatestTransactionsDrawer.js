import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {ReactComponent as FolderCabinetSVG} from '../../../assets/svg/folder-cabinet.svg';
import {selectHasTransactions, selectIsFetchingTransactions} from "../../../redux/transactions/transactions.selectors";
import {connect} from "react-redux";
import WithLoader from "../../HOC/WithLoader";
import Box from "@material-ui/core/Box";
import {LatestTransactionsContainer} from "./LatestTransactions.styles";
import LatestTransactionsList from "./LatestTransactionsList";

export const transactionDrawerWidth = 370;

const useStyles = makeStyles(() => ({
    drawer: {
        width: transactionDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: transactionDrawerWidth,
    },
    svgImage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '80%',
    }
}));

const TransactionsDrawerWithLoader = WithLoader(({children}) => <React.Fragment>{children}</React.Fragment>);

const LatestTransactionsDrawer = ({open, hasTransactions, isFetchingTransactions}) => {
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
            <TransactionsDrawerWithLoader loading={isFetchingTransactions}>
                {
                    hasTransactions ? (
                        <LatestTransactionsContainer>
                            <LatestTransactionsList type='spending'/>
                            <LatestTransactionsList type='earning'/>
                        </LatestTransactionsContainer>
                    ) : (
                        <Box px={2} pt={3}>
                            <h3>Latest Transactions</h3>
                            <p>No Transactions to Display</p>
                            <FolderCabinetSVG className={classes.svgImage}/>
                        </Box>
                    )
                }
            </TransactionsDrawerWithLoader>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    isFetchingTransactions: selectIsFetchingTransactions(state),
    hasTransactions: selectHasTransactions(state),
});

export default connect(mapStateToProps)(LatestTransactionsDrawer);