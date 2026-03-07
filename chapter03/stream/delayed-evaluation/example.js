function sum_primes(a, b) {
    function iter(count, accum) {
        return count > b
            ? accum
            : is_prime(count)
                ? iter(count + 1, count + accum)
                : iter(count + 1, accum);
    }

    return iter(a, 0);
}

function sum_primes_2(a, b) {
    return accumulate((x, y) => x + y,
        0,
        filter(is_prime, enumerate_interval(a, b)));
}

function stream_tail(stream) {
    return tail(stream)();
}

function stream_ref(s, n) {
    return n === 0
        ? head(s)
        : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_for_each(fun, s) {
    if (is_null(s)) {
        return true;
    } else {
        fun(head(s));
        return stream_for_each(fun, stream_tail(s));
    }
}

function display_stream(s) {
    return stream_for_each(display, s);
}