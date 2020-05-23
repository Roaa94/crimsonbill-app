import React from 'react';
import {DashboardHeaderContainer, DashboardHeaderSvg} from "./DashboardHeader.styles";
import {ReactComponent as SittingManSVG} from '../../../assets/svg/man-sitting.svg';
import DashboardHeaderBalance from "../dashboard-header-balance/DashboardHeaderBalance";

const DashboardHeader = () => {
    return (
        <DashboardHeaderContainer>
            <DashboardHeaderBalance/>
            <DashboardHeaderSvg>
                <SittingManSVG/>
            </DashboardHeaderSvg>
        </DashboardHeaderContainer>
    );
};

export default DashboardHeader;
