const pair = (x, y) => [ x, y ];
const head = p => p[0];
const tail = p => p[1];

const is_null = x => x === null;

function abs(x) {
    return x > 0
        ? x
        : x === 0
            ? 0
            : -x;
}

function list(...items) {
    if (items.length === 0) {
        return null;
    }
    return pair(items[0], list(...items.slice(1)));
}

// function scale_list(items, factor) {
//     return is_null(items)
//         ? null
//         : pair(head(items) * factor,
//             scale_list(tail(items), factor));
// }

console.log(scale_list(list(1, 2, 3, 4, 5), 10)); // [10, [20, [30, [40, [50, null]]]]]

function map(fun, items) {
    return is_null(items)
        ? null
        : pair(fun(head(items)),
            map(fun, tail(items)));
}

console.log(map(abs, list(-10, 2.5, -11.6, 17))); // [10, [2.5, [11.6, [17, null]]]]
console.log(map(x => x * x, list(1, 2, 3, 4))); // [1, [4, [9, [16, null]]]]

function scale_list(items, factor) {
    return map(x => x * factor, items);
}