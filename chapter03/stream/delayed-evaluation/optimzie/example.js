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

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_map_optimized(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)), memo(() => () => stream_map_optimized(f, stream_tail(s))));

}
