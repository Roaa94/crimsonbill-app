import React from 'react';
import {colors} from "../../styles/global";
import Chart from "react-apexcharts";
import {getChartOptions} from "../../utils/charts/options";
import {connect} from "react-redux";
import {selectActivityChartData} from "../../redux/global/charts-data.selectors";

const chartColors = [
    colors.secondary,
    colors.primary,
];

const ActivityAreaChart = ({spendingsData, earningsData}) => {

    const series = [
        {
            name: 'Earnings',
            data: earningsData.map(item => item.total)
        }, {
            name: 'Spendings',
            data: spendingsData.map(item => item.total)
        }
    ];

    const customOptions = {
        colors: chartColors,
        categories: spendingsData.map(item => item.date),
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

const mapStateToProps = state => ({
    spendingsData: selectActivityChartData('spending')(state),
    earningsData: selectActivityChartData('earning')(state),
});

export default connect(mapStateToProps)(ActivityAreaChart);
