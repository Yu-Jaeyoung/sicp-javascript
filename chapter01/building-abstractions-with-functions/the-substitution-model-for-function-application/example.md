> To apply a compound function to arguments, evaluate the return expression of the
> function with each parameter replaced by the corresponding argument.

하나의 복합 함수를 인수들에 적용하기 위해, 함수의 각 매개변수를 해당 인수로 치환해서 함수의 반환 표현식을 평가한다.

다음 예로 적용 과정을 살펴본다.

```javascript
f(5)
```

f는 함수이며, f의 반환 표현식은 다음과 같다.

```javascript
sum_of_squares(a + 1, a * 2)
```

이 반환 표현식에 있는 매개변수 a를 인수 5로 치환하면 다음이 된다.

```javascript
sum_of_squares(5 + 1, 5 * 2)
```

이제 이 문제는 함수 표현식 sum_of_squares와 인수 두 개의 적용을 평가하는 문제로 축소되었다.
이 함수 적용의 평가에는 세 개의 부분문제(subproblem)이 관여한다.
우선 함수 표현식을 평가해서 두 인수에 적용할 함수들을 구해야 하고, 두 인수 표현식을 평가해서 두 개의 인수를 구해야한다.
함수 표현식 sum_of_squares가 지칭하는 것은 앞서 sum_of_squares라는 이름으로 선언한 함수이다.

```javascript
function sum_of_squares(x, y) {
    return square(x) + square(y);
}
```

그리고 `5 + 1` 은 6이고, `5 * 2` 는 10이다.
이제 sum_of_squares 함수를 6과 10에 적용해야 한다.
두 값을 sum_of_squares 본문의 반환 표현식에 있는 매개변수 x와 y에 대입하면 반환 표현식은 다음과 같은 모습이 된다.

```javascript
square(6) + square(10)
```

마찬가지 방식으로 각 인수를 square 함수의 반환 표현식에 대입하면 다음이 나온다.

```javascript
(6 * 6) + (10 * 10)
```

이제 곱샘을 처리하면 다음이 나오고,

```javascript
36 + 100
```

덧셈까지 처리하면 최종적인 값이 나온다.

```javascript
136
```

방금 설명한 과정을 함수 적용의 치환 모형 (substitution model)이라고 부른다.

_치환 모형은 함수 적용을 이해하는 데 도움을 주기 위한 것일 뿐, 해석기가 반드시 이런 식으로 작동한다는 뜻은 아니다._