function factorial(n) {
    function iter(product, counter) {
        if (counter > n) {
            return product;
        }

        return iter(counter * product, counter + 1);
    }

    return iter(1, 1);
}

function factorial(n) {
    let product = 1;
    let counter = 1;

    function iter() {
        if (counter > n) {
            return product;
        } else {
            product = counter * product;
            counter = counter + 1;
            return iter();
        }
    }

    return iter();
}