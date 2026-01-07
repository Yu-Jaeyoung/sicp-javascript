const pair = (x, y) => [ x, y ];
const head = p => p[0];
const tail = p => p[1];

const is_null = x => x === null;

function is_pair(x) {
    return Array.isArray(x) && x.length === 2;
}

function list(...items) {
    if (items.length === 0) {
        return null;
    }
    return pair(items[0], list(...items.slice(1)));
}

function length(items) {
    return is_null(items)
        ? 0
        : 1 + length(tail(items));
}

const x = pair(list(1, 2), list(3, 4));

console.log(length(x)); // 3

console.log(count_leaves(x)); // 4

console.log(list(x, x)); // list(list(list(1, 2), 3, 4), list(list(1, 2), 3, 4))

console.log(length(list(x, x))); // 2

console.log(count_leaves(list(x, x))); // 8

function count_leaves(x) {
    return is_null(x)
        ? 0
        : !is_pair(x)
            ? 1
            : count_leaves(head(x)) + count_leaves(tail(x));
}