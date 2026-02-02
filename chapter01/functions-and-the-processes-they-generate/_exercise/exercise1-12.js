// Exercise 1.12
// The arrangement of numbers in the following pattern is called Pascal's triangle.
//         1
//       1   1
//     1   2   1
//   1   3   3   1
//  1   4  6  4   1
// ...
// The entries on the two slanted sides (both edges) of this triangle are all 1,
// and the inner entries are each the sum of the two numbers in the row above it.
// Write a function that computes the entries of Pascal's triangle using a recursive process.

function pascal(row, col) {
    // end case : both edges
    if (col === 0 || col === row) {
        return 1;
    }

    // recursion case: sum of the two numbers in the above row
    return pascal(row - 1, col - 1) + pascal(row - 1, col);
}

function pascal_improve(row, col) {
    return col === 0 || col === row
        ? 1
        : pascal_improve(row - 1, col - 1) + pascal_improve(row - 1, col);
}