import React from 'react';
import Drawer from "../components/ui/Drawer";
import DashboardPage from "./DashboardPage";
import {Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import AccountsPage from "./AccountsPage";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import PieChartRoundedIcon from "@material-ui/icons/PieChartRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import StatisticsPage from "./StatisticsPage";
import SettingsPage from "./SettingsPage";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
}));


const HomePage = ({path}) => {
    const classes = useStyles();
    const drawerLinks = [
        {
            id: 0,
            title: 'Dashboard',
            url: `${path}`,
            icon: <HomeRoundedIcon/>,
            component: DashboardPage,
        },
        {
            id: 1,
            title: 'Accounts',
            url: `${path}/accounts`,
            icon: <DescriptionRoundedIcon/>,
            component: AccountsPage,
        },
        {
            id: 2,
            title: 'Statistics',
            url: `${path}/statistics`,
            icon: <PieChartRoundedIcon/>,
            component: StatisticsPage,
        },
        {
            id: 3,
            title: 'Settings',
            url: `${path}/settings`,
            icon: <SettingsRoundedIcon/>,
            component: SettingsPage,
        },
    ];

    return (
        <div className={classes.root}>
            <Drawer links={drawerLinks}/>
            <main className={classes.content}>
                <Switch>
                    {
                        drawerLinks.map(({id, url, component}) => (
                            <Route exact path={url} component={component} key={id}/>
                        ))
                    }
                </Switch>
            </main>
        </div>
    );
};

export default HomePage;