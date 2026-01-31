function add(x, y) {
    return apply_generic('add', list(x, y));
}

function sub(x, y) {
    return apply_generic('sub', list(x, y));
}

function mul(x, y) {
    return apply_generic('mul', list(x, y));
}

function div(x, y) {
    return apply_generic('div', list(x, y));
}

function install_javascript_number_package() {
    function tag(x) {
        return attach_tag('javascript-number', x);
    }

    put('add', list('javascript_number', 'javascript_number'), (x, y) => tag(x + y));
    put('sub', list('javascript_number', 'javascript_number'), (x, y) => tag(x - y));
    put('mul', list('javascript_number', 'javascript_number'), (x, y) => tag(x * y));
    put('div', list('javascript_number', 'javascript_number'), (x, y) => tag(x / y));
    put('make', 'javascript_number', x => tag(x));

    return 'done';
}

function make_javascript_number(n) {
    return get('make', 'javascript_number')(n);
}

function install_rational_package() {
    // 내부 함수들
    function number(x) {
        return head(x);
    }

    function denom(x) {
        return tail(x);
    }

    function make_rat(x, y) {
        const g = gcd(x, y);
        return pair(n / g, d / g);
    }

    function add_rat(x, y) {
        return make_rat(numer(x) * denom(y) + numer(y) * denom(x),
            denom(x) * denom(y));
    }

    function sub_rat(x, y) {
        return make_rat(numer(x) * denom(y) - numer(y) * denom(x),
            denom(x) * denom(y));
    }

    function mul_rat(x, y) {
        return make_rat(numer(x) * numer(y),
            denom(x) * denom(y));
    }

    function div_rat(x, y) {
        return make_rat(numer(x) * denom(y),
            denom(x) * numer(y));
    }

    // 시스템 나머지 부분과의 인터페이스
    function tag(x) {
        return attach_tag('rational', x);
    }

    put('add', list('rational', 'rational'), (x, y) => tag(add_rat(x, y)));
    put('sub', list('rational', 'rational'), (x, y) => tag(sub_rat(x, y)));
    put('mul', list('rational', 'rational'), (x, y) => tag(mul_rat(x, y)));
    put('div', list('rational', 'rational'), (x, y) => tag(div_rat(x, y)));
    put('make', 'rational', (n, d) => tag(make_rat(n, d)));

    return 'done';
}

function make_rational(n, d) {
    return get('make', 'rational')(n, d);
}

function install_complex_package() {
    // 직교좌표 패키지와 극좌표 패키지에서 가져온 함수들
    function make_from_real_imag(x, y) {
        return get('make_from_real_img', 'rectangular')(x, y);
    }

    function make_from_mag_ang(r, a) {
        return get('make_from_mag_ang', 'polar')(r, a);
    }

    // 내부 함수들
    function add_complex(z1, z2) {
        return make_from_real_imag(real_part(z1) + real_part(z2), imag_part(z1) + imag_part(z2));
    }

    function sub_complex(z1, z2) {
        return make_from_real_imag(real_part(z1) - real_part(z2), imag_part(z1) - imag_part(z2));
    }

    function mul_complex(z1, z2) {
        return make_from_mag_ang(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2));
    }

    function div_complex(z1, z2) {
        return make_from_mag_ang(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2));
    }

    // 시스템 나머지 부분과의 인터페이스
    function tag(z) {
        return attach_tag('complex', z);
    }

    put('add', list('complex', 'complex'), (z1, z2) => tag(add_complex(z1, z2)));
    put('sub', list('complex', 'complex'), (z1, z2) => tag(sub_complex(z1, z2)));
    put('mul', list('complex', 'complex'), (z1, z2) => tag(mul_complex(z1, z2)));
    put('div', list('complex', 'complex'), (z1, z2) => tag(div_complex(z1, z2)));

    put('make_from_real_imag', 'complex', (x, y) => tag(make_from_real_imag(x, y)));
    put('make_from_mag_ang', 'complex', (r, a) => tag(make_from_mag_ang(r, a)));

    return 'done';
}

function make_complex_from_real_imag(x, y) {
    return get('make_from_real_imag', 'complex')(x, y);
}

function make_complex_from_mag_ang(r, a) {
    return get('make_from_mag_ang', 'complex')(r, a);
}