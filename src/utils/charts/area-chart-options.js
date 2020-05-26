import {getChartColors} from "./charts.utils";

export const getAreaChartOptions = (categories) => {
    return {
        chart: {
            fontFamily: 'Raleway, sans-serif',
            height: '100%',
            type: 'area',
            toolbar: {
                show: false,
            },
            selection: {
                enabled: false,
            },
            zoom: {
                enabled: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        markers: {
            size: 5,
            hover: {
                size: 7,
            }
        },
        colors: getChartColors(categories.length),
        xaxis: {
            type: 'category',
            categories: categories,
            tooltip: {
                enabled: false,
            },
            labels: {
                format: 'dd/MM',
                datetimeUTC: true,
            },
            tickPlacement: 'on',
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            markers: {
                width: 25,
                height: 8,
            },
            onItemClick: {
                toggleDataSeries: false
            },
        },
    };
}