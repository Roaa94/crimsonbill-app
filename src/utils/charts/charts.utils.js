import {colors} from "../../styles/global";
import randomColor from 'randomcolor';

export const getChartColors = (itemsCount) => {
    const chartColors = [
        colors.secondary,
        colors.primary,
    ];

    if (itemsCount > 2) {
        const randomColors = [];
        while (randomColors.length < itemsCount - 2) {
            const newColor = randomColor({
                hue: randomColors.length % 2 !== 0 ? colors.primary : colors.secondary,
                seed: 'color'
            });
            randomColors.push(newColor);
        }
        chartColors.push(...randomColors);
    }

    return chartColors;
}