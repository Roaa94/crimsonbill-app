import React from 'react';
import AppDrawer from "../../components/ui/AppDrawer";
import DashboardPage from "../dashboard/DashboardPage";
import {Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import AccountsPage from "../accounts/AccountsPage";

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

    return (
        <div className={classes.root}>
            <AppDrawer/>
            <main className={classes.content}>
                <Switch>
                    <Route exact path={path} component={DashboardPage}/>
                    <Route exact path={`${path}/accounts`} component={AccountsPage}/>
                </Switch>
            </main>
        </div>
    );
};

export default HomePage;