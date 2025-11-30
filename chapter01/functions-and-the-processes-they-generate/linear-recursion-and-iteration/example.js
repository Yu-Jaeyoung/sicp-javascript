// function factorial(n) {
//     return n === 1
//         ? 1
//         : n * factorial(n - 1);
// }

// function factorial(n) {
//     return fact_iter(1, 1, n);
// }
//
// function fact_iter(product, counter, max_count) {
//     return counter > max_count ? product
//         : fact_iter(
//             counter * product,
//             counter + 1,
//             max_count,
//         );
// }

// hide the declaration of fact_iter function using block structure
// function factorial(n) {
//     function iter(product, counter) {
//         return counter > n
//             ? product
//             : iter(
//                 counter * product,
//                 counter + 1,
//             );
//     }
//
//     return iter(1, 1);
// }

function factorial(n) {
    function iter(product, counter) {
        return counter > n
            ? product
            : iter(counter * product, counter + 1);
    }

    return iter(1, 1);
}