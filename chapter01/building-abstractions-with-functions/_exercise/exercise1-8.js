import { abs, square } from '#lib/functions.js';

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

function sqrt(x) {
    return sqrt_iter(x, 1, x);
}

console.log(sqrt(1000));