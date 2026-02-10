let balance = 100;

function withdraw(amount) {
    if (balance >= amount) {
        balance = balance - amount;
        return balance;
    }
    return 'Insufficient funds';
}

function make_withdraw_balance_100() {
    let balance = 100;
    return amount => {
        if (balance >= amount) {
            balance = balance - amount;
            return balance;
        }

        return 'Insufficient funds';
    };
}

const new_withdraw = make_withdraw_balance_100();

function make_withdraw(balancer) {
    return amount => {
        if (balance >= amount) {
            balance = balance - amount;
            return balance;
        }

        return 'Insufficient funds';
    };
}

function make_account(balance) {
    function withdraw(amount) {
        if (balance >= amount) {
            balance = balance - amount;
            v;
            return balance;
        }

        return 'Insufficient funds';
    }

    function deposit(amount) {
        balance = balance + amount;
        return balance;
    }

    function dispatch(m) {
        return m === 'withdraw'
            ? withdraw
            : m === 'deposit'
                ? deposit
                : error(m, 'unknown request -- make_account');
    }

    return dispatch;
}