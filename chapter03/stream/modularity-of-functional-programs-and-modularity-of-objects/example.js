function make_rand() {
    let x = random_init;
    return () => {
        x = rand_update(x);
        return x;
    };
}

const random_numbers =
    pair(random_init,
        () => stream_map(rand_update, random_numbers));

function map_successive_pairs(f, s) {
    return pair(f(head(s), head(stream_tail(s)))
        , () => map_successive_pairs(
            f,
            stream_tail(stream_tail(s))));
}

const dirichlet_stream =
    map_successive_pairs((r1, r2) => gcd(r1, r2) === 1, random_numbers);

function monte_carlo(experiment_stream, passed, failed) {
    function next(passed, failed) {
        return pair(passed / (passed + failed),
            () => monte_carlo(stream_tail(experiment_stream), passed, failed));
    }

    return head(experiment_stream)
        ? next(passed + 1, failed)
        : next(passed, failed + 1);
}

const pi = stream_map(p => math_sqrt(6 / p),
    monte_carlo(dirichlet_stream, 0, 0));

function make_simplified_withdraw(balance) {
    return amount => {
        balance = balance - amount;
        return balance;
    };
}

function stream_withdraw(balance, amount_stream) {
    return pair(balance,
        () => stream_withdraw(balance - head(amount_stream),
            stream_tail(amount_stream)));
}
