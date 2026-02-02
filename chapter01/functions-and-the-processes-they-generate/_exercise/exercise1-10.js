// Exercise 1.10
// The following procedure function computes a mathematical function called Ackermann's function.
// Consider the following procedures, functions, where A is the procedure defined function declared above:
// Give concise mathematical definitions for the functions computed by the procedures functions f, g, and h for positive integer values of $n$. For example, $k(n)$ computes $5n^2$.

function A(x, y) {
    return y === 0
        ? 0
        : x === 0
            ? 2 * y
            : y === 1
                ? 2
                : A(x - 1, A(x, y - 1));
}

// n
function f(n) {
    return A(0, n);
}

// A(1, n) -> A(0, A(1, n-1)) -> 2 * A(1, n-1)
// A(1, n-1) -> A(0, A(1, n-2)) -> 2 * A(1, n-2)
// ...
// A(1, 1) -> 2
// So, A(1, n) = 2^n
// 2^n
function g(n) {
    return A(1, n);
}


// A(2, n) -> A(1, A(2, n-1)) A(0, A(1, A(2, n-2)))
// A(0, A(1, A(1, A(2, n-3))))
// ...
// A(2, 0) -> A(1, 1) -> 2
// A(2, 1) -> A(1, 2) -> 4
// A(2, 2) -> A(1, 4) -> 16
// A(2, 3) -> A(1, 16) -> 65536
// So, A(2, n) = 2^(2^(...2)) (n times)
function h(n) {
    return A(2, n);
}


// 5n^2
function k(n) {
    return 5 * n * n;
}