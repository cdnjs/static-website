export default (text, length) => {
    text = text || '';
    return text.slice(0, length) + (text.length > length ? '...' : '');
};
