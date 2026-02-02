function fast_expt_iter(a, b, n) {
    return n === 0
        ? a
        : is_even(n)
            ? fast_expt_iter(a, b * b, n / 2)
            : fast_expt_iter(a * b, b, n - 1);
}

function is_even(n) {
    return n % 2 === 0;
}

console.log(fast_expt_iter(1, 2, 5));