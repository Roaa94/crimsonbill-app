export const getChartOptions = ({colors, categories, customTooltip}) => {
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
        colors: colors,
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
        tooltip: {
            custom: customTooltip ? customTooltip : undefined,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
    };
}