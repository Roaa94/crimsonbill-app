import React from 'react';
import {DashboardContentContainer} from "./DashboardContent.styles";
import Grid from "@material-ui/core/Grid";
import {ReactComponent as SittingGirlSVG} from '../../../assets/svg/girl-sitting.svg';
import ActivityAreaChart from "../../transactions/transactions-charts/ActivityAreaChart";
import DashboardPieChartTabs from "../DashboardPieChartTabs";

const DashboardContent = () => {

    return (
        <DashboardContentContainer>
            <Grid container alignItems='stretch'>
                <Grid item xs={12} lg={4}>
                    <div className="girl-svg">
                        <SittingGirlSVG/>
                    </div>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <div className="chart-card pie-chart">
                        <DashboardPieChartTabs/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="chart-card activity-chart">
                        <ActivityAreaChart/>
                    </div>
                </Grid>
            </Grid>
        </DashboardContentContainer>
    );
};

export default DashboardContent;
