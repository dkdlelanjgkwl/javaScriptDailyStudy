# **타입 변환과 단축평가**
## **1.** 암묵적 타입변환
### 1.1. 문자타입으로 변환
        // 숫자 타입
        0 + ''              // "0"
        -0 + ''             // "0"
        1 + ''              // "1"
        -1 + ''             // "-1"
        NaN + ''            // "NaN"
        Infinity + ''       // "Infinity"
        -Infinity + ''      // "-Infinity"

        // 불리언 타입
        true + ''           // "true"
        false + ''          // "false"

        // null 타입
        null + ''           // "null"

        // undefined 타입
        undefined + ''      // "undefined"

        // 심볼 타입
        (Symbol()) + ''     // TypeError: Cannot convert a Symbol value to a string

        // 객체 타입
        ({}) + ''           // "[object Object]"
        Math + ''           // "[object Math]"
        [] + ''             // ""
        [10, 20] + ''       // "10,20"
        (function(){}) + '' // "function(){}"
        Array + ''          // "function Array() { [native code] }"
### 1.2. 숫자타입으로 변환
        // 문자열 타입
        +''             // 0
        +'0'            // 0
        +'1'            // 1
        +'string'       // NaN

        // 불리언 타입
        +true           // 1
        +false          // 0

        // null 타입
        +null           // 0

        // undefined 타입
        +undefined      // NaN

        // 심볼 타입
        +Symbol()       // TypeError: Cannot convert a Symbol value to a number

        // 객체 타입
        +{}             // NaN
        +[]             // 0
        +[10, 20]       // NaN
        +(function(){}) // NaN
> 빈 문자열(‘’), 빈 배열([]), null, false는 0으로, true는 1로 변환된다. 객체와 빈 배열이 아닌 배열, undefined는 변환되지 않아 NaN이 된다는 것에 주의.
### 1.3. 불리언 타입으로 변환
1.아래값은 false로 평가되는 Falsy 값이다.

- false
- undefined
- null
- 0, -0
- NaN
- '' (빈문자열)

2.Falsy 값 이외의 모든 값은 모두 true로 평가되는 Truthy 값이다.

아래 예제는 Truthy/Falsy 값을 판별하는 함수다.
       
        // 주어진 인자가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
        function isFalsy(v) {
        return !v;
        }

        // 주어진 인자가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
        function isTruthy(v) {
        return !!v;
        }
## **2.** 명시적 타입변환
### **2.1.** 문자열 타입으로 변환
1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
1. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
1. 단항 산술 연산자를 이용하는 방법 (+)
1. 산술 연산자를 이용하는 방법 (*)
### **2.2.**  숫자 타입으로 변환
1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
1. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
1. 단항 산술 연산자를 이용하는 방법
1. 산술 연산자를 이용하는 방법
### **2.3.** 불리언 타입으로 변환
1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
1. ! 부정 논리 연산자를 두번 사용하는 방법
## **3** 단축평가
>  “논리합(||) 연산자와 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. 논리합(||), 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어는 한쪽으로 평가된다.”라는 것이다.

| 단축 평가 표현식 | 평가 결과 |
---|:---
`true || anything`| `true`
`false || anything`|`anything`
`true && anything`|	`anything`
`false && anything`	|`false`
- 객체가 null인지 확인하고 프로퍼티를 참조할 때
        var elem = null;

        console.log(elem.value); // TypeError: Cannot read property 'value' of null
        console.log(elem && elem.value); // null
- 함수 매개변수에 기본값을 설정할 때
        // 단축 평가를 사용한 매개변수의 기본값 설정
        function getStringLength(str) {
        str = str || '';
        return str.length;
        }

        getStringLength();     // 0
        getStringLength('hi'); // 2

        // ES6의 매개변수의 기본값 설정
        function getStringLength(str = '') {
        return str.length;
        }

        getStringLength();     // 0
        getStringLength('hi'); // 2
