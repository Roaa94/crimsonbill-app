import React from 'react';
import VerticalTabs from "../ui/navigation/vertical-tabs/VerticalTabs";
import TransactionsTaxonomiesPieChart from "../transactions/transactions-charts/TransactionsTaxonomiesPieChart";

const DashboardPieChartTabs = () => {

    const tabs = [
        {
            index: 0,
            label: 'Spending Categories',
            tabContent: <TransactionsTaxonomiesPieChart type='spending'/>
        },
        {
            index: 1,
            label: 'Income Sources',
            tabContent: <TransactionsTaxonomiesPieChart type='earning'/>
        }
    ]

    return (
        <VerticalTabs tabs={tabs}/>
    );
};

export default DashboardPieChartTabs;