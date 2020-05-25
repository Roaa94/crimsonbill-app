import React from 'react';
import {colors} from "../../styles/global";
import Chart from "react-apexcharts";
import {getChartOptions} from "../../utils/charts/options";


const chartColors = [
    colors.secondary,
    colors.primary,
];

const ActivityAreaChart = () => {
    const series = [
        {
            name: 'Earnings',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Spendings',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ];

    const height = 350;

    const tooltip = ({series, seriesIndex, dataPointIndex, w}) => {
        return '<div>' +
            '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
            '</div>'
    }

    const customOptions = {
        colors: chartColors,
        customTooltip: tooltip,
    }

    const options = getChartOptions(customOptions);

    return (
        <Chart
            options={options}
            series={series}
            type='area'
            height='100%'
        />
    );
};

export default ActivityAreaChart;
