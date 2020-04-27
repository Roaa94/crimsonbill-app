import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {selectUserAuthData} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {ReactComponent as FolderCabinetSVG} from '../../assets/svg/folder-cabinet.svg';
export const transactionDrawerWidth = 320;

const useStyles = makeStyles(() => ({
    drawer: {
        width: transactionDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: transactionDrawerWidth,
        padding: '30px 20px',
        justifyContent: 'space-between',
    },
    svgImage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '80%',
    }
}));

const TransactionsDrawer = ({open, user}) => {
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
            <div>
                <h3>Latest Transactions</h3>
                <p>No Transactions to Display</p>
            </div>
            <FolderCabinetSVG className={classes.svgImage}/>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    user: selectUserAuthData(state),
});

export default connect(mapStateToProps)(TransactionsDrawer);