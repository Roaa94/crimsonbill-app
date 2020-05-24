import React from 'react';
import {DashboardHeaderContainer, DashboardHeaderSvg} from "./DashboardHeader.styles";
import {ReactComponent as SittingManSVG} from '../../../assets/svg/man-sitting.svg';
import DashboardHeaderBalance from "../dashboard-header-balance/DashboardHeaderBalance";
import DashboardHeaderRates from "../dashboard-header-rates/DashboardHeaderRates";
import Grid from "@material-ui/core/Grid";

const DashboardHeader = () => {
    return (
        <DashboardHeaderContainer>
            <Grid container>
                <Grid item xs={12} md={5}>
                    <DashboardHeaderBalance/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <DashboardHeaderRates/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <DashboardHeaderSvg>
                        <SittingManSVG/>
                    </DashboardHeaderSvg>
                </Grid>
            </Grid>
        </DashboardHeaderContainer>
    );
};

export default DashboardHeader;
