import { square } from '#lib/functions.js';

function sum_of_squares(x, y) {
    return square(x) + square(y);
}

console.info(sum_of_squares(3, 4));

function f(a) {
    return sum_of_squares(a + 1, a * 2);
}

console.info(f(5));

