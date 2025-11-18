// statement evaluation of interpreter
console.log(486);

// Expressions representing numbers may be combined with operators
// (such as + or *) to form a compound expression that represents
// the application of a corresponding primitive function to those numbers.
console.log(137 + 349);

console.log(1000 - 334);

console.log(5 * 99);

console.log(10 / 4);

console.log(2.7 + 10);

// Expression such as these, which contain other expressions as components(구성요소),
// are called combinations(조합).
// Combinations that are formed by an operator-symbol(연산자) in the middle,
// and operand(피연산자) expressions to the left and right of it, are called operator combinations(연산자 조합).
// The value of an operator combination is obtained by applying the function specified by the operator
// to the arguments that are the values of the operands.

// The convention of placing the operator between the operands is known as infix notation(중위 표기법).


// As in mathematics, operator combinations can be nested,
// that is, they can have operands that themselves are operator combinations:
console.log((3 * 5) + (10 - 6));

// JavaScript also follows the usual conventions when parentheses are omitted:
// multiplication and division bind more strongly than addition and subtraction.
// For example,
// 3 * 5 + 10 / 2
// stands for
// (3 * 5) + (10 / 2)

// We say that * and / have higher precedence than + and -.
// Sequences of additions and subtractions are read from left to right,
// as are sequences of multiplications and divisions.
// Thus,
// 1 - 5 / 2 * 4 + 3;
// stands for
// (1 - ((5 / 2) * 4)) * 3;

// We say that the operators +, -, *, and / are left-associative(왼쪽 결합).

// Even with complex expressions, the interpreter always operates in the
// same basic cycle: It reads a statement typed by the user, evaluates the statement,
// and prints the result. This mode of operation is often expressed by saying that
// the interpreter runs in a read-evaluate-print loop. Observe in particular that it is not
// necessary to explicitly instruct the interpreter to print the value of the statement.
