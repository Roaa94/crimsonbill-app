import React from 'react';
import {BalanceLine, BalanceText, DashboardHeaderBalanceContainer} from "./DashboardHeaderBalance.styles";
import Balance from "../../Balance";
import {useMediaQuery} from "@material-ui/core";

const DashboardHeaderBalance = () => {
    const xlDevice = useMediaQuery(theme => theme.breakpoints.up('lg'));

    return (
        <DashboardHeaderBalanceContainer isDeviceXL={xlDevice}>
            <Balance type='dots' fontSize={xlDevice ? '1.7' : '1.5'} fullHeightLoader={false}/>
            <BalanceLine />
            <BalanceText>
                Total Available Balance
            </BalanceText>
        </DashboardHeaderBalanceContainer>
    );
};

export default DashboardHeaderBalance;
