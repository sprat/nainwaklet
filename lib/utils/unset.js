/* safe unset */
function unset(obj, key) {
    try {
        delete obj[key];
    } catch (e) {
        obj[key] = undefined;
    }
}


module.exports = unset;
