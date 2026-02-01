function gcd(a, b) {
    return b === 0
        ? a
        : gcd(b, a % b);
}

function gcd_terms(a, b) {
    return is_empty_termlist(b)
        ? a
        : gcd_terms(b, remainder_terms(a, b));
}