function integral(integrand, initial_value, dt) {
    const integ = pair(initial_value,
        () => add_streams(scale_stream(integrand, dt),
            integ));

    return integ;
}