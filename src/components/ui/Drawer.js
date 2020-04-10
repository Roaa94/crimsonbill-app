import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import {auth} from "../../firebase/firebase.utils";
import {useHistory, useLocation} from 'react-router-dom';
import LinkListItem from "./link-list-item/LinkListItem.component";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AppTitle from "./app-title/AppTitle.component";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        justifyContent: 'space-between',
        width: drawerWidth,
        overflow: 'visible',
    },
}));

const Drawer = ({links}) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <MuiDrawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <AppTitle/>
            <div>
                {
                    links.map(({id, url, ...otherProps}) => (
                        <LinkListItem
                            key={id}
                            handleClick={() => history.push(url)}
                            {...otherProps}
                            color='secondary'
                            active={location.pathname === url}
                        />
                    ))
                }
            </div>
            <LinkListItem
                title='Log out'
                icon={<ExitToAppRoundedIcon/>}
                handleClick={() => auth.signOut()}
            />
        </MuiDrawer>
    );

};

export default Drawer;
