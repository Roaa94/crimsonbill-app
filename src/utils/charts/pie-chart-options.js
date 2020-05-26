export const getPieChartOptions = ({colors, labels, customTooltip}) => {
    return {
        chart: {
            fontFamily: 'Raleway, sans-serif',
            height: '100%',
            type: 'donut',
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
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: '20%',
                },
            }
        },
        markers: {
            size: 5,
            hover: {
                size: 7,
            }
        },
        colors: colors ? colors : undefined,
        tooltip: {
            custom: customTooltip ? customTooltip : undefined,
        },
        labels: labels,
        legend: {
            position: 'left',
            height: '100%',
            horizontalAlign: 'center',
            fontSize: '14px',
            onItemClick: {
                toggleDataSeries: false
            },
        },
    };
}