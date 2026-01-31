function add_complex_to_javascript_num(z, x) {
    return make_complex_from_real_imag(real_part(z) + x, imag_part(z));
}

put('add', list('complex', 'javascript_number'), (z, x) => tag(add_complex_to_javascript_num(z, x)));

function javascript_number_to_complex(n) {
    return make_complex_from_real_imag(contents(n), 0);
}

put_coercion('javascript_number', 'complex', javascript_number_to_complex);

function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);

    if (!is_undefined(fun)) {
        return apply(fun, map(contents, args));
    } else {
        if (length(args) === 2) {
            const type1 = head(type_tags);
            const type2 = head(tail(type_tags));

            const a1 = head(args);
            const a2 = head(tail(args));

            const t1_to_t2 = get_coercion(type1, type2);
            const t2_to_t1 = get_coercion(type2, type1);

            return !is_undefined(t1_to_t2)
                ? apply_generic(op, list(t1_to_t2(a1), a2))
                : !is_undefined(t2_to_t1)
                    ? apply_generic(op, list(a1, t2_to_t1(a2)))
                    : error(list(op, type_tags),
                        'No method for these types');
        } else {
            return error(list(op, type_tags), 'No method for these types');
        }
    }
}