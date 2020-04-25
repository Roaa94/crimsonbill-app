import React from 'react';
import Drawer from "../../components/ui/navigation/Drawer";
import DashboardPage from "../dashboard/DashboardPage";
import {Route, Switch} from "react-router-dom";
import AccountsPage from "../accounts/AccountsPage";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import PieChartRoundedIcon from "@material-ui/icons/PieChartRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import StatisticsPage from "../StatisticsPage";
import SettingsPage from "../SettingsPage";
import {PageContent, PageWrapper} from "./HomePage.styles";

const HomePage = ({path}) => {

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
        <PageWrapper>
            <Drawer links={drawerLinks}/>
            <PageContent>
                <Switch>
                    {
                        drawerLinks.map(({id, url, component}) => (
                            <Route exact path={url} component={component} key={id}/>
                        ))
                    }
                </Switch>
            </PageContent>
        </PageWrapper>
    );
};

export default HomePage;