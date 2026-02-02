// Exercise 1.11
// A function $f$ is defined by the rules $f(n)=n$
// if $n < 3$ and $f(n)=f(n-1)+2f(n-2)+3f(n-3)$ if $n \ge 3$.
// Write a JavaScript function that computes $f$ by means of a recursive process.
// Write a function that computes $f$ by means of an iterative process.

function f_recursive(n) {
    if (n < 0) {
        throw new Error();
    }

    if (n < 3) {
        return n;
    }

    return f_recursive(n - 1) + 2 * f_recursive(n - 2) + 3 * f_recursive(n - 3);
}


function f_iterative(n) {
    if (n < 0) {
        throw new Error();
    }

    if (n < 3) {
        return n;
    }

    function iter(count, a, b, c) {
        if (count === n) {
            return a;
        }

        return iter(count + 1, a + 2 * b + 3 * c, a, b);
    }

    return iter(2, 2, 1, 0);
}

console.log(f_recursive(5));
console.log(f_iterative(5));
