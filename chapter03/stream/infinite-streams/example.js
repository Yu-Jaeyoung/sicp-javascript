function integers_starting_from(n) {
    return pair(n, () => integers_starting_from(n + 1));
}

const integers = integers_starting_from(1);

function is_divisible(x, y) {
    return x % y === 0;
}

const no_sevens = stream_filter(x => !is_divisible(x, 7), integers);

function fibgen(a, b) {
    return pair(a, () => fibgen(b, a + b));
}

const fibs = fibgen(0, 1);

function sieve(stream) {
    return pair(head(stream),
        () => sieve(stream_filter(
            x => !is_divisible(x, head(stream)),
            stream_tail(stream))));
}

const primes = sieve(integers_starting_from(2));