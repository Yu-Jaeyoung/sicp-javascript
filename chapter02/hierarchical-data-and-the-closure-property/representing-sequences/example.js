const pair = (x, y) => [ x, y ];
const head = p => p[0];
const tail = p => p[1];

function list(...items) {
    if (items.length === 0) {
        return null;
    }
    return pair(items[0], list(...items.slice(1)));
}

const one_through_four = list(1, 2, 3, 4);

console.log(one_through_four);
// [1, [2, [3, [4, null]]]]

console.log(head(one_through_four));
// 1

console.log(tail(one_through_four));
// [2, [3, [4, null]]]

console.log(head(tail(one_through_four)));
// 2

console.log(pair(10, one_through_four));
// [10, [1, [2, [3, [4, null]]]]]

console.log(pair(5, one_through_four));

// [5, [1, [2, [3, [4, null]]]]]

function is_pair(x) {
    return Array.isArray(x) && x.length === 2;
}

function is_list(x) {
    return x === null || (is_pair(x) && is_list(tail(x)));
}

const test = [ 1, [ [ 2, 3 ], [ [ 4, [ 5, null ] ], [ 6, null ] ] ] ];

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

console.log(to_list_notation(test));