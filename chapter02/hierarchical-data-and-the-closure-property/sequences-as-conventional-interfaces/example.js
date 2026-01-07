function sum_odd_squares(tree) {
    return is_null(tree)
        ? 0
        : !is_pair(tree)
            ? is_odd(tree)
                ? sqaure(tree)
                : 0
            : sum_odd_squares(head(tree)) +
            sum_odd_squares(tail(tree));
}

function even_fibs(n) {
    function next(k) {
        if (k > n) {
            return null;
        } else {
            const f = fib(k);
            return is_even(f)
                ? pair(f, next(k + 1))
                : next(k + 1);
        }
    }

    return next(0);
}