import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import {auth} from "../../firebase/firebase.utils";
import {useHistory, useLocation} from 'react-router-dom';
import LinkListItem from "./link-list-item/LinkListItem.component";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AppTitle from "./app-title/AppTitle.component";
import DrawerAvatar from "./drawer-avatar/DrawerAvatar.component";

export const drawerWidth = 260;

const drawerStyles = makeStyles(() => ({
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
    const drawerClasses = drawerStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <MuiDrawer
            className={drawerClasses.drawer}
            variant="permanent"
            classes={{
                paper: drawerClasses.drawerPaper,
            }}
            anchor="left"
        >
            <AppTitle/>
            <div>
                <DrawerAvatar/>
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
                handleClick={
                    () => auth.signOut().then(() => {
                        console.log('Log out successful');
                        // console.log(user);
                    }).catch(function (error) {
                        console.log('Log out failed', error.message);
                    })
                }
            />
        </MuiDrawer>
    );

};

export default Drawer;
