function make_rand() {
    let x = random_itit;
    return () => {
        x = rand_update(x);
        return x;
    };
}

const rand = make_rand();

function estimate_pi() {
    return math_sqrt(6 / monte_carlo(trials, dirichlet_test));
}

function dirichlet_test() {
    return gcd(rand(), rand()) === 1;
}

function monte_carlo(trials, experiment) {
    function iter(trials_remaining, trials_passed) {
        return trials_remaining === 0
            ? trials_passed / trials
            : experiment()
                ? iter(trials_remaining - 1, trials_passed + 1)
                : iter(trials_remaining - 1, trials_passed);
    }

    return iter(trials, 0);
}

function estimate_pi(trials) {
    return math_sqrt(6 / random_gcd_test(trials, random_init));
}

function random_gcd_test(trials, initial_x) {
    function iter(trials_remaining, trials_passed, x) {
        const x1 = rand_update(x);
        const x2 = rand_update(x1);

        return trials_remaining === 0
            ? trials_passed / trials
            : gcd(x1, x2) === 1
                ? iter(trials_remaining - 1, trials_passed + 1, x2)
                : iter(trials_remaining - 1, trials_passed, x2);
    }

    return iter(trials, 0, initial_x);
}

function make_simplified_withdraw(balance) {
    return amount => {
        balance = balance - amount;
        return balance;
    };
}

const W = make_simplified_withdraw(25);

function make_decrementer(balance) {
    return amount => balance - amount;
}
