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

// function scale_tree(tree, factor) {
//     return is_null(tree)
//         ? null
//         : ! is_pair(tree)
//             ? tree * factor
//             : pair(scale_tree(head(tree), factor),
//                 scale_tree(tail(tree), factor));
// }

function map(fun, items) {
    return is_null(items)
        ? null
        : pair(fun(head(items)),
            map(fun, tail(items)));
}

function scale_tree(tree, factor) {
    return map(sub_tree => is_pair(sub_tree)
            ? scale_tree(sub_tree, factor)
            : sub_tree * factor,
        tree);
}


console.log(scale_tree(list(1, list(2, list(3, 4), 5), list(6, 7)), 10));

// list(10, list(20, list(30, 40), 50), list(60, 70))