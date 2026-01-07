accumulate(append,
    null,
    map(i => map(j => list(i, j),
            enumerate_interval(1, i - 1)),
        enumerate_interval(1, n)));

function flatmap(f, seq) {
    return accumulate(append, null, map(f, seq));
}

function is_prime_sum(pair) {
    return is_prime(head(pair) + head(tail(pair)));
}

function make_pair_sum(pair) {
    return list(head(pair), head(tail(pair)),
        head(pair) + head(tail(pair)));
}

function prime_sum_pairs(n) {
    return map(make_pair_sum,
        filter(is_prime_sum,
            flatmap(i => map(j => list(i, j),
                    enumerate_interval(1, i - 1)),
                enumerate_interval(1, n))));
}

function permutation(s) {
    return is_null(s)
        ? list(null)
        : flatmap(x => map(p => pair(x, p),
                permutation(remove(x, s))),
            s);
}

function remove(item, sequence) {
    return filter(x => !(x === item),
        sequence);
}