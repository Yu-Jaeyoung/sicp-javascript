function adjoin_term(term, term_list) {
    return is_equal_to_zero(coeff(term))
        ? term_list
        : pair(term, term_list);
}

const the_empty_termlist = null;

function first_term(term_list) {
    return head(term_list);
}

function rest_terms(term_list) {
    return tail(term_list);
}

function is_empty_termlist(term_list) {
    return is_null(term_list);
}

function make_term(order, coeff) {
    return list(order, coeff);
}

function order(term) {
    return head(term);
}

function coeff(term) {
    return head(tail(term));
}

function make_polynomial(variable, terms) {
    return get('make', 'polynomial')(variable, terms);
}