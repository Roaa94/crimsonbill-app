import React from 'react';
import Chart from "react-apexcharts";
import {getPieChartOptions} from "../../../utils/charts/pie-chart-options";
import {selectTransactionsTaxonomiesChartData} from "../../../redux/global/charts-data.selectors";
import {connect} from "react-redux";

const TransactionsTaxonomiesPieChart = ({taxonomiesChartData}) => {

    const series = taxonomiesChartData.map(data => Number(data.total));
    const labels = taxonomiesChartData.map(data => data.taxonomyName);

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

const mapStateToProps = (state, ownProps) => ({
    taxonomiesChartData: selectTransactionsTaxonomiesChartData(ownProps.type)(state),
})

export default connect(mapStateToProps)(TransactionsTaxonomiesPieChart);
