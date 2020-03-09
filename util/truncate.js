export default (text, length) => {
    return text.slice(0, length) + (text.length > length ? '...' : '');
};
