function sqrt_iter(before, guess, x) {
    return is_good_enough(before, guess, x)
        ? guess
        : sqrt_iter(guess, improve(guess, x), x);
}

function improve(guess, x) {
    return average(guess, x / guess);
}

function average(x, y) {
    return (x + y) / 2;
}

function is_good_enough(before, guess, x) {
    return abs(before - guess) < 0.001;
    // return abs(square(guess) - x) < guess * 0.0001;
}

function abs(x) {
    return x > 0
        ? x
        : x === 0
            ? 0
            : -x;
}

function square(x) {
    return x * x;
}

function sqrt(x) {
    return sqrt_iter(x, 1, x);
}

console.log(sqrt(1000000000000000000000));