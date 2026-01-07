const pair = (x, y) => [ x, y ];
const head = p => p[0];
const tail = p => p[1];

function list(...items) {
    if (items.length === 0) {
        return null;
    }
    return pair(items[0], list(...items.slice(1)));
}

function is_pair(x) {
    return Array.isArray(x) && x.length === 2;
}

function filter(predicate, sequence) {
    return is_null(sequence)
        ? null
        : predicate(head(sequence))
            ? pair(head(sequence), filter(predicate, tail(sequence)))
            : filter(predicate, tail(sequence));
}

function accumulate(op, initial, sequence) {
    return is_null(sequence)
        ? initial
        : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function append(list1, list2) {
    return is_null(list1)
        ? list2
        : pair(head(list1), append(tail(list1), list2));
}

const plus = (x, y) => x + y;
const times = (x, y) => x * y;


const is_null = x => x === null;

console.log(accumulate(plus, 0, list(1, 2, 3, 4, 5)));    // 15
console.log(accumulate(times, 1, list(1, 2, 3, 4, 5)));   // 120
console.log(accumulate(pair, null, list(1, 2, 3, 4, 5))); // list(1, 2, 3, 4, 5)


function enumerate_interval(low, high) {
    return low > high
        ? null
        : pair(low, enumerate_interval(low + 1, high));
}

enumerate_interval(2, 7); // list(2, 3, 4, 5, 6, 7)

function enumerate_tree(tree) {
    return is_null(tree)
        ? null
        : !is_pair(tree)
            ? list(tree)
            : append(enumerate_tree(head(tree)),
                enumerate_tree(tail(tree)));
}

enumerate_tree(list(1, list(2, list(3, 4)), 5)); // list(1, 2, 3, 4, 5)

function list_fib_squares(n) {
    return accumulate(pair,
        null,
        map(square,
            map(fib,
                enumerate_interval(0, n))));
}

list_fib_squares(10); // list(0, 1, 1, 4, 9, 25, 64, 169, 441, 1156, 3025)

function product_of_squares_of_odd_elements(sequence) {
    return accmulate(times,
        1,
        map(square,
            filter(is_odd, sequence)));
}

product_of_squares_of_odd_elements(list(1, 2, 3, 4, 5)); // 225

function salary_of_highest_paid_programmer(records) {
    return accumulate(math_max,
        0,
        map(salary,
            filter(is_programmer, records)));
}