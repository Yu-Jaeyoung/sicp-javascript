function sqrt_iter(before, guess, x) {
    return is_good_enough(before, guess, x)
        ? guess
        : sqrt_iter(guess, cube_improve(guess, x), x);
}

function cube_improve(guess, x) {
    return (x / (square(guess)) + 2 * guess) / 3;
}

function is_good_enough(before, guess, x) {
    return abs(before - guess) < 0.001;
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

console.log(sqrt(1000));