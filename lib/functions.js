function square(x) {
    return x * x;
}

function abs(x) {
    return x > 0
        ? x
        : x === 0
            ? 0
            : -x;
}

function average(x, y) {
    return (x + y) / 2;
}

export { square, abs, average };