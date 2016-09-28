function fromInt(classe) {
    switch (classe) {
    case 0:
        return 'nain-déci';
    case 1:
        return 'brave';
    case 2:
        return 'sadique';
    case 3:
        return 'rampant';
    case 7:
        return 'mutant';
    default:
        return;
    }
}

module.exports = {
    fromInt: fromInt
};
