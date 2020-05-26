import React from 'react';
import Chart from "react-apexcharts";
import {getPieChartOptions} from "../../../utils/charts/pie-chart-options";

const TransactionsTaxonomiesPieChart = () => {

    const series = [44, 55, 41, 17, 15];
    const labels = ['A', 'B', 'C', 'D', 'E'];

    const customOptions = {
        labels: labels,
    }

    const options = getPieChartOptions(customOptions);
    return (
        <Chart
            options={options}
            series={series}
            type='donut'
            height='100%'
        />
    );
};

export default TransactionsTaxonomiesPieChart;
