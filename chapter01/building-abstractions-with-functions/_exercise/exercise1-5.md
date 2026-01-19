> Ben Bitdiddle has invented a test to determine whether the interpreter he is faced with is
> using applicative-order evaluation or normal-order evaluation. He declares the following
> two functions:

벤 빗디들은 주어진 해석기가 인수 우선 평가를 사용하는지 정상 순서 평가를 사용하는지 파악하는 방법을 고안했다.
이를 위해 벤은 다음 두 함수를 선언했다.

```javascript
function p() {
    return p();
}

function test(x, y) {
    return x === 0 ? 0: y;
}
```

> Then he evaluates the statement

이제 다음과 같은 문장을 평가하면 해석기의 평가 방식을 파악할 수 있다.

```javascript
test(0, p())
```

> What behavior will Ben observe with an interpreter that uses applicative-order evaluation?
> What behavior will he observe with an interpreter that uses normal-order evaluation?
> Explain your answer.

해석기가 인수 우선 평가를 사용할 때와 정상 순서 평가를 사용할 때 이 문장이 어떤 식으로 평가되는지를 각각 서술하라.

> Assume that the evaluation rule for conditional expressions is the
> same whether the interpreter is using normal or applicative order: The predicate expression
> is evaluated first, and the result determines whether to evaluate the consequent or the
> alternative expression.

해석기가 정상 순서이든 인수 우선이든 조건부 표현식의 평가 규칙은 동일하다고 가정할 것.
즉, 어떤 경우이든 술어 표현식이 제일 먼저 평가되고, 그 결과에 따라 귀결 표현식 또는 대안 표현식이 평가된다.

---
1. 인수 우선 평가

인수 우선 평가 방식을 사용하게 되면 무한 루프에 빠지게 된다.

```text
test(0, p())를 평가
↓
1. 먼저 인수들을 평가
   - 첫 번째 인수: 0 → 0 ✓
   - 두 번째 인수: p() → p()를 평가 시도
   
2. p()는 무한 재귀
   function p() { return p(); }
   → 무한 루프 또는 스택 오버플로우

3. 함수 본문에 절대 도달하지 못함(무한 루프)
```

2. 정상 순서 평가

술어에서 x === 0 즉, 0 === 0 에 대해 참이므로, 귀결-표현식만을 활용하여 0이 반환된다.

```text
test(0, p())를 평가
↓
1. 인수를 평가하지 않고 표현식 자체를 치환
   x ← 0
   y ← p() (표현식 자체, 평가 안 함!)
   
2. 함수 본문: return 0 === 0 ? 0 : p()
   - 술어: 0 === 0 → true
   - 귀결: 0 반환
   - p()는 절대 평가되지 않음 ✓

3. 결과: 0
```