import React from 'react';
import {PieChartTabsContainer} from "./DashboardPieChartTabs.styles";
import CategoriesPieChart from "../../transactions/transactions-charts/CategoriesPieChart";
import VerticalTabs from "../../ui/navigation/vertical-tabs/VerticalTabs";
import SourcesPieChart from "../../transactions/transactions-charts/SourcesPieChart";

const DashboardPieChartTabs = () => {

    const tabs = [
        {
            index: 0,
            label: 'Spending Categories',
            tabContent: <CategoriesPieChart/>
        },
        {
            index: 1,
            label: 'Income Sources',
            tabContent: <SourcesPieChart/>
        }
    ]

    return (
        <PieChartTabsContainer>
            <VerticalTabs tabs={tabs}/>
        </PieChartTabsContainer>
    );
};

export default DashboardPieChartTabs;