// function solve(f, y0, dt) {
//     const y = integral(dy, y0, dt);
//     const dy = stream_map(f, y);
//     return y;
// }

function integral(delayed_integrand, initila_value, dt) {
    const integ = pair(initila_value,
        () => {
            const integrand = delayed_integrand();
            return add_streams(scale_stream(integrand, dt),
                integ);
        });
    return integ;
}

function solve(f, y0, dt) {
    const y = integral(() => dy, y0, dt);
    const dy = stream_map(f, y);
    return y;
}
