function pair(x, y) {
    return [ x, y ];
}

function head(p) {
    return p[0];
}

function tail(p) {
    return p[1];
}

function is_null(value) {
    return value === null;
}

function display(value) {
    console.log(value);
}

function average(x, y) {
    return (x + y) / 2;
}

function stream_tail(stream) {
    return tail(stream)();
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function sqrt_improve(guess, x) {
    return average(guess, x / guess);
}

function sqrt_stream(x) {
    return pair(1, () => stream_map(guess => sqrt_improve(guess, x), sqrt_stream(x)));
}

// display_stream_n(sqrt_stream(2), 10);

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

function stream_for_each_n(fun, s, n) {
    if (n <= 0 || is_null(s)) {
        return true;
    } else {
        fun(head(s));
        return stream_for_each_n(fun, stream_tail(s), n - 1);
    }
}

function display_stream_n(s, n) {
    return stream_for_each_n(display, s, n);
}

function scale_stream(stream, factor) {
    return stream_map(x => x * factor, stream);
}


function pi_summands(n) {
    return pair(1 / n, () => stream_map(x => -x, pi_summands(n + 2)));
}

function partial_sums(s) {
    return pair(head(s),
        () => add_streams(stream_tail(s),
            partial_sums(s)));
}

function stream_map_2(f, s1, s2) {
    return is_null(s1) || is_null(s2)
        ? null
        : pair(f(head(s1), head(s2)),
            () => stream_map_2(f, stream_tail(s1), stream_tail(s2)));
}

function add_streams(s1, s2) {
    return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

const pi_stream = scale_stream(partial_sums(pi_summands(1)), 4);

// display_stream_n(pi_stream, 10);

function stream_ref(s, n) {
    return n === 0
        ? head(s)
        : stream_ref(stream_tail(s), n - 1);
}

function square(x) {
    return x * x;
}

function memo(fun) {
    let already_run = false;
    let result = undefined;

    return () => {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    };
}

function euler_transform(s) {
    const s0 = stream_ref(s, 0);
    const s1 = stream_ref(s, 1);
    const s2 = stream_ref(s, 2);
    return pair(s2 - square(s2 - s1) / (s0 + (-2) * s1 + s2),
        memo(() => euler_transform(stream_tail(s))));
}

function make_tableau(transform, s) {
    return pair(s, () => make_tableau(transform, transform(s)));
}

// display_stream_n(euler_transform(pi_stream), 10);

function accelerated_sequence(transform, s) {
    return stream_map(head, make_tableau(transform, s));
}

// display_stream_n(accelerated_sequence(euler_transform, pi_stream),12);