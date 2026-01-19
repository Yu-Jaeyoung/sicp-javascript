import { abs, average } from '#lib/functions.js';

function sqrt(x) {
    function sqrt_iter(guess, x) {
        return is_good_enough(guess, x)
            ? guess
            : sqrt_iter(improve(guess, x), x);
    }

    return sqrt_iter(1, x);
}

function improve(guess, x) {
    return average(guess, x / guess);
}

function square(x) {
    return x * x;
}

function is_good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}

// ---

function is_good_enough_improved(guess, previous_guess) {
    return abs(guess - previous_guess) < abs(guess) * 0.001;
}

function sqrt_improved(x) {
    function sqrt_iter(guess, previous_guess) {
        return is_good_enough_improved(guess, previous_guess)
            ? guess
            : sqrt_iter(improve(guess, x), guess);
    }

    return sqrt_iter(1.0, 2.0);  // 초기값들이 다르게 시작
}

// console.log(sqrt(1000000000000000000000));
console.log(sqrt_improved(1000000000000000000000));