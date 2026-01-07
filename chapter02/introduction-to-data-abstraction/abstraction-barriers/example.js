function make_rat(n, d) {
    return pair(n, d);
}

function numer(x) {
    const g = gcd(head(x), tail(x));
    return head(x) / g;
}

function gcd(a, b) {
    return b === 0 ? a: gcd(b, a % b);
}

function denom(x) {
    const g = gcd(head(x), tail(x));
    return tail(x) / g;
}

function pair(x, y) {
    return m => m === 0 ? x : y;
}

function head(p) {
    return p(0);
}

function tail(p) {
    return p(1);
}