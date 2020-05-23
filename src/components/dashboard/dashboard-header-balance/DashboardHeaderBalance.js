import React from 'react';
import {BalanceLine, BalanceText, DashboardHeaderBalanceContainer} from "./DashboardHeaderBalance.styles";
import Balance from "../../Balance";

const DashboardHeaderBalance = () => {
    return (
        <DashboardHeaderBalanceContainer>
            <Balance type='dots' fontSize='1.7'/>
            <BalanceLine />
            <BalanceText>
                Total Available Balance
            </BalanceText>
        </DashboardHeaderBalanceContainer>
    );
};

export default DashboardHeaderBalance;
