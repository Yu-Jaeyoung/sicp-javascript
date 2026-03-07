function stream_enumerate_interval(low, high) {
    return low > high
        ? null
        : pair(low, () => stream_enumerate_interval(low + 1, high));
}

function stream_filter(pred, stream) {
    return is_null(stream)
        ? null
        : pred(head(stream))
            ? pair(head(stream)
                , () => stream_filter(pred, stream_tail(stream)))
            : stream_filter(pred, stream_tail(stream));

}