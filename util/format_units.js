// Thanks https://stackoverflow.com/a/49671010

export default (value, precision) => {
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(value)) / 3);
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
    const suffix = abbrev[order];
    return (value / Math.pow(10, order * 3)).toFixed(precision) + suffix;
};
