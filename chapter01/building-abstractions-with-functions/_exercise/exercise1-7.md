> The is_good_enough test used in computing square roots will not be very effective for
> finding the square roots of very small numbers. Also, in real computers, arithmetic operations are almost
> always performed with limited precision. This makes our test inadequate
> for very large numbers. Explain these statements, with examples showing how the test fails
> for small and large numbers. An alternative strategy for implementing is_good_enough is
> to watch how guess changes from one iteration to the next and to stop when the change is
> a very small fraction of the guess. Design a square-root function that uses this kind of end test.
> Does this work better for small and large numbers?


제곱근 계산에 쓰인 is_good_enough 술어의 판정 방식은 아주 작은 수의 제곱근을 구할 때는 그리 효과적이지 않다.
그리고 실제 컴퓨터에서 산술 연산은 거의 항상 정밀도(유효자릿수)가 제한된 상태로 수행되기 때문에, is_good_enough의 판정 방식은 아주 큰 수의 제곱근 계산에도 부적합하다.
이러한 점을 좀 더 자세히 설명하고, 각은 수와 큰 수에 대해 판정이 실패하는 사례들을 제시하라.
is_good_enough를 구현하는 또 다른 전략은 반복 과정에서 guess의 변화량을 추적하면서 변화량이 guess의 아주 작은 비율보다 작으면 충분히 좋은 추측값이라고 판정하는 것이다.
이런 종류의 바뀐 종료 판정 방식을 사용하는 제곱근 함수를 설계하라.
작은 수와 큰 수에 대해 그 함수가 본문의 함수보다 더 잘 작동하는가?

---

# 연습문제 1.7 풀이

## 1. 원래 `is_good_enough`의 문제점 분석

원래 구현은 다음과 같다:

```javascript
function is_good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}
```

이 방식은 **절대 오차**(absolute error)를 고정된 임계값 0.001과 비교한다.

### 문제 1: 아주 작은 수에서의 실패

**작은 수에서 정밀도가 떨어지는 이유:**

- 0.001이라는 임계값이 작은 수에 비해 **상대적으로 너무 크다**
- 예: x = 0.0001의 실제 제곱근은 0.01인데, guess = 0.03일 때도 통과
    - square(0.03) - 0.0001 = 0.0009 - 0.0001 = 0.0008 < 0.001 ✓

```javascript
// 원래 버전 테스트
function sqrt(x) {
    function sqrt_iter(guess, x) {
        return is_good_enough(guess, x)
            ? guess
            : sqrt_iter(improve(guess, x), x);
    }

    return sqrt_iter(1, x);
}

function improve(guess, x) {
    return average(guess, x / guess);
}

function average(x, y) {
    return (x + y) / 2;
}

function abs(x) {
    return x > 0
        ? x
        : x === 0
            ? 0
            : -x;
}

function square(x) {
    return x * x;
}

function is_good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}

// 작은 수 테스트
console.log('sqrt(0.0001) =', sqrt(0.0001));
// 출력: 0.03230844... (실제: 0.01)
// 오차율: 223%!

console.log('sqrt(0.000001) =', sqrt(0.000001));
// 출력: 0.03135... (실제: 0.001)
// 오차율: 3035%!
```

### 문제 2: 아주 큰 수에서의 실패

**큰 수에서 무한 루프에 빠지는 이유:**

- 부동소수점 연산의 **정밀도 한계** 때문에 개선이 더 이상 일어나지 않음
- 예: x = 10^15 (1조의 1000배) 수준에서는
    - 연속된 두 개선값의 차이가 기계 정밀도보다 작아짐
    - `improve(guess, x) === guess` 상황 발생
    - 하지만 `abs(square(guess) - x)`는 여전히 0.001보다 훨씬 큼

```javascript
// 큰 수 테스트
console.log('sqrt(1e15) =', sqrt(1e15));
// 무한 루프 또는 매우 오래 걸림
```

## 2. 개선된 버전: 상대 오차 기반 판정

**핵심 아이디어:** 절대 오차 대신 **상대 변화율**을 측정

```javascript
function is_good_enough_improved(guess, previous_guess) {
    return abs(guess - previous_guess) < abs(guess) * 0.001;
}

function sqrt_improved(x) {
    function sqrt_iter(guess, previous_guess) {
        return is_good_enough_improved(guess, previous_guess)
            ? guess
            : sqrt_iter(improve(guess, x), guess);
    }

    return sqrt_iter(1.0, 2.0);  // 초기값들이 다르게 시작
}
```

**왜 이 방식이 더 나은가:**

1. **작은 수**: 변화율이 0.1%가 되면 멈추므로, 절대 크기와 무관하게 정밀함
2. **큰 수**: 부동소수점 정밀도 한계에 도달하면 자연스럽게 수렴 (변화가 없으면 종료)

## 3. 핵심 통찰

### 절대 오차 vs 상대 오차

**절대 오차 방식의 근본적 한계:**

- 하나의 고정된 임계값(0.001)으로 모든 크기의 수를 판정
- scale-invariant 하지 않음

**상대 오차 방식의 장점:**

- 수의 크기에 자동으로 적응 (scale-invariant)
- "guess가 0.1%만큼만 변하면 충분히 수렴했다"는 직관적 기준
- 부동소수점 한계에 자연스럽게 대응

### 구현상의 변화

주목할 점:

1. `is_good_enough`가 이제 **두 개의 guess를 비교** (현재 vs 이전)
2. `sqrt_iter`가 **previous_guess를 추적**해야 함
3. 재귀 호출 시 `improve(guess, x)`와 `guess`를 함께 전달


> _**상태 추적**의 필요성을 보여주는 좋은 예_