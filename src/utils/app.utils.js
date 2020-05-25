export const compareDaysByTimestamp = (d1Timestamp, d2Timestamp) => {
    const d1 = new Date(d1Timestamp);
    const d2 = new Date(d2Timestamp);
    return d1.getYear() === d2.getYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
};

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}