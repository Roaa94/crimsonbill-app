import React from 'react';
import {
    DashboardContentContainer,
    TopContent,
    BottomContent,
    ActivityChartContainer, SittingGirlSVGContainer
} from "./DashboardContent.styles";
import Grid from "@material-ui/core/Grid";
import {ReactComponent as SittingGirlSVG} from '../../../assets/svg/girl-sitting.svg';
import ActivityAreaChart from "../../transactions/transactions-charts/ActivityAreaChart";
import DashboardPieChartTabs from "../dashboard-pie-chart-tabs/DashboardPieChartTabs";

const DashboardContent = () => {
    return (
        <DashboardContentContainer>
            <TopContent>
                <Grid container alignItems='stretch' className='content-grid'>
                    <Grid item xs={12} lg={4}>
                        <SittingGirlSVGContainer>
                            <SittingGirlSVG/>
                        </SittingGirlSVGContainer>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <DashboardPieChartTabs/>
                    </Grid>
                </Grid>
            </TopContent>
            <BottomContent>
                <ActivityChartContainer>
                    <ActivityAreaChart/>
                </ActivityChartContainer>
            </BottomContent>
        </DashboardContentContainer>
    );
};

export default DashboardContent;
