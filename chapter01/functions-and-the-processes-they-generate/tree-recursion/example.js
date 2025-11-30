// function fib(n) {
//     return n === 0
//         ? 0
//         : n === 1
//             ? 1
//             : fib(n - 1) + fib(n - 2);
// }

function fib(b) {
    return fib_iter(1, 0, n);
}

function fib_iter(a, b, count) {
    return count === 0
        ? b
        : fib_iter(a + b, a, count - 1);
}