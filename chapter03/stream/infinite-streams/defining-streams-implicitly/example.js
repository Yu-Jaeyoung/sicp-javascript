const ones = pair(1, () => ones);

function stream_map_2(f, s1, s2) {
    return is_null(s1) || is_null(s2)
        ? null
        : pair(f(head(s1), head(s2)),
            () => stream_map_2(f, stream_tail(s1), stream_tail(s2)));
}

function stream_map_2_optimized(f, s1, s2) {
    return is_null(s1) || is_null(s2)
        ? null
        : pair(f(head(s1), head(s2)),
            memo(() => stream_map_2_optimized(f, stream_tail(s1), stream_tail(s2))));
}

function add_streams(s1, s2) {
    return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

const integers = pair(1, () => add_streams(ones, integers));

const fibs = pair(0,
    () => pair(1,
        () => add_streams(stream_tail(fibs),
            fibs)));

function scale_stream(stream, factor) {
    return stream_map(x => x * factor, stream);
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

const double = pair(1, () => scale_stream(double, 2));

const primes = pair(2,
    () => stream_filter(is_prime, integers_starting_from(3)));

function is_prime(n) {
    function iter(ps) {
        return square(head(ps)) > n
            ? true
            : is_divisible(n, head(ps))
                ? false
                : iter(stream_tail(ps));
    }

    return iter(primes);
}