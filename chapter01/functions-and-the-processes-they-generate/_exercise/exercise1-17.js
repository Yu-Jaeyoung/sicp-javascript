function double(n) {
    return n + n;
}

function halve(n) {
    return n / 2;
}

function is_even(n) {
    return n % 2 === 0;
}

function fast_times(a, b) {
    return b === 1
        ? a
        : b === 0 || a === 0
            ? 0
            : is_even(b)
                ? fast_times(double(a), halve(b))
                : a + fast_times(a, b - 1);
}