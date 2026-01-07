const pair = (x, y) => [ x, y ];
const head = p => p[0];
const tail = p => p[1];

const is_null = x => x === null;

function is_pair(x) {
    return Array.isArray(x) && x.length === 2;
}

function is_list(x) {
    return x === null || (is_pair(x) && is_list(tail(x)));
}

function list(...items) {
    if (items.length === 0) {
        return null;
    }
    return pair(items[0], list(...items.slice(1)));
}

function list_ref(items, n) {
    return n === 0
        ? head(items)
        : list_ref(tail(items), n - 1);
}

const squares = list(1, 4, 9, 16, 25);

console.log(list_ref(squares, 3)); // 16

// function length(items) {
//     return is_null(items)
//         ? 0
//         : 1 + length(tail(items));
// }

const odds = list(1, 3, 5, 7);

console.log(length(odds)); // 4

function length(items) {
    function length_iter(a, count) {
        return is_null(a)
            ? count
            : length_iter(tail(a), count + 1);
    }

    return length_iter(items, 0);
}

console.log(length(odds)); // 4

function append(list1, list2) {
    return is_null(list1)
        ? list2
        : pair(head(list1), append(tail(list1), list2));
}

console.log(to_list_notation(append(squares, odds))); // list(1, 4, 9, 16, 25, 1, 3, 5, 7);

console.log(to_list_notation(append(odds, squares))); // list(1, 3, 5, 7, 1, 4, 9, 16, 25);

function to_list_notation(structure) {
    if (structure === null) {
        return null;
    }

    if (is_list(structure)) {
        const elements = [];
        let current = structure;

        while (current !== null) {
            const h = head(current);

            if (is_list(h)) {
                elements.push(to_list_notation(h));
            } else if (is_pair(h) && !is_list(h)) {
                elements.push(JSON.stringify(h));
            } else {
                elements.push(h);
            }

            current = tail(current);
        }

        return `list(${ elements.join(', ') })`;
    }

    return structure;
}


