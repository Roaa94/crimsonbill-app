import React from 'react';
import {
    DashboardContentContainer,
    TopContent,
    PieChartContainer,
    BottomContent,
    ActivityChartContainer, SittingGirlSVGContainer
} from "./DashboardContent.styles";
import Grid from "@material-ui/core/Grid";
import {ReactComponent as SittingGirlSVG} from '../../../assets/svg/girl-sitting.svg';

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
                        <PieChartContainer>
                            {/*  Transactions Taxonomies Pie Chart  */}
                        </PieChartContainer>
                    </Grid>
                </Grid>
            </TopContent>
            <BottomContent>
                <ActivityChartContainer>
                    {/*  Activity Line Chart  */}
                </ActivityChartContainer>
            </BottomContent>
        </DashboardContentContainer>
    );
};

export default DashboardContent;
