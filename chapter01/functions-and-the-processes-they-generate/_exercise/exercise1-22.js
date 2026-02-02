function smallest_divisor(n) {
    return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
    return square(test_divisor) > n
        ? n
        : divides(test_divisor, n)
            ? test_divisor
            : find_divisor(n, test_divisor + 1);
}

function divides(a, b) {
    return b % a === 0;
}

function is_prime(n) {
    return n === smallest_divisor(n);
}

function timed_prime_test(n) {
    display(n);
    return start_prime_test(n, performance.now());
}


function start_prime_test(n, start_time) {
    return is_prime(n)
        ? report_prime(performance.now() - start_time)
        : false;
}

function report_prime(elapsed_time) {
    display(' *** ' + elapsed_time);
    return true;
}

function display(n) {
    console.log(n);
}


function square(x) {
    return x * x;
}

function search_for_primes(start, count) {
    function iter(n, found) {
        return found >= count
            ? undefined
            : timed_prime_test(n)
                ? iter(n + 2, found + 1)
                : iter(n + 2, found);
    }

    return iter(start % 2 === 0 ? start + 1: start, 0);
}

console.log('==========10000==========');
search_for_primes(1000, 3);

console.log('==========10000==========');
search_for_primes(10000, 3);

console.log('==========100000==========');
search_for_primes(100000, 3);