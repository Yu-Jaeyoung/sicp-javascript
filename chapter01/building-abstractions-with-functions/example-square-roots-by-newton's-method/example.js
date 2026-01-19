function sqrt_iter(guess, x) {
    return is_good_enough(guess, x)
        ? guess
        : sqrt_iter(improve(guess, x), x);
}

function improve(guess, x) {
    return average(guess, x / guess);
}

function average(x, y) {
    return (x + y) / 2;
}

function is_good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}

// 피제곱근 수가 무엇이든 항상 1이라는 추측값으로 시작
function sqrt(x) {
    return sqrt_iter(1, x);
}