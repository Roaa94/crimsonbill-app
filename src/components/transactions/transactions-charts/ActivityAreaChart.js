import React from 'react';
import Chart from "react-apexcharts";
import {getAreaChartOptions} from "../../../utils/charts/area-chart-options";
import {connect} from "react-redux";
import {selectActivityChartData} from "../../../redux/global/charts-data.selectors";

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

    const categories = spendingsData.map(item => item.date);

    const options = getAreaChartOptions(categories);

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
