// function abs(x) {
//     return x >= 0 ? x: -x;
// }

// 술어 ? 귀결-표현식 : 대안-표현식
// predicate ? consequent-expression : alternative-expression

function abs(x) {
    return x > 0
        ? x
        : x === 0
            ? 0
            : -x;
}

// function greater_or_equal(x, y) {
//     return x > y || x === y;
// }

function greater_or_equal(x, y) {
    return !(x < y);
}
