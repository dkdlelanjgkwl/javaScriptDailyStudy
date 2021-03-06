# Function
> 함수는 일련의 과정을 문(statement)들로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것이다.<br>함수 내부로 입력을 전달받는 변수를 매개변수(parameter), 입력을 인수(argument), 출력을 반환값(return value)이라 한다
## 1. 함수의정의
    function multiply(x123,y123) {
        return x123 * y123 ;
    }

    console.log(multiply(1,3)); // res = 3
## 2. 함수의 사용이유
>함수는 필요할 때 여러 번 호출할 수 있다. 동일한 작업을 반복적으로 수행해야 한다면 같은 코드를 중복해서 여러 번 작성하는 것이 아니라 미리 정의된 함수를 재사용하는 것이 효율적이다. 함수는 몇 번이든 호출할 수 있으므로 코드의 재사용이라는 측면에서 매우 유용하다.
## 3. 함수 리터럴
        const multiply = function (x,y){
            return x * y;
        }
        console.log(multiply(5,6));
- 함수 이름<br> 1. 식별자 네이밍 규칙을 따른다.<br> 2. 함수이름을 생략할수있다. 이를 기명함수 또는 익명함수라고한다.<br><br>
- 매개변수<br> 1. 매개변수는 쉼표로 구분한다.<br> 2. 함수를 호출할때 매개변수의 순서와 함수 리터럴의 매개변수 순서는 일치한다.<br><br>
- 함수호출로 함수를 실행한다.
## 4. 함수 생성시점과 함수 호이스팅
> 함수선언문으로 정의한 함수는 함수 선언문 이전에 호출될수없다.<br>함수표현식으로 정의한 함수는 함수선언문 이전에 호출할수 있다.
<br>**이유 : 함수선언문으로 정의한 함수와 함수표현식으로 정의한 함수의 생성시점이 다름**
- **함수호이스팅**<br><br> 함수선언문은 함수가 순차적으로 실행되는 런타임 이전에 함수객체가 미리 생성되고 javaScript엔진은 함수선언문의 이름과 동일한 이름의 식별자를 암묵적으로 생성하고 암묵적으로 생성된 식별자에 함수객체를 할당한다.<br><br>
- **변수호이스팅과 함수호이스팅(함수선언문일경우)의 차이**<br><br>1. 함수호이스팅과 변수 호이스팅은 런타임이전에 실행되어 식별자를 할당하는 것은 같음.<br><br>2. 하지만 var로 선언된 변수에 할당되는 것은 undefined 이지만 함수선언에 의해 호이스팅 되는경우는 함수객체 자체가 할당된다.<br><br>3. 따라서 함수선언문을 런타임이전에 참조해도 함수객체를 바로 호출가능하고, var로 선언된변수는 런타임이전에 참조할시엔 undefined값이 읽히게 된다.<br><br>
- **함수 표현식일 경우**<br><br> 1. 함수 표현식은 변수 할당문의 값이 함수 리터럴인 경우를 말한다.<br><br> 2. 따라서 변수 할당문의 값은 할당문이 실행되는 시점인 런타임에 평가되게 되고 변수선언한 식별자는 런타임 이전에 호이스팅되어 undefined가 할당되고 런타임에 함수리터럴의 값이 평가되어 식별자에 다시 할당이 되는것이다.<br><br>3. **결론 : 함수표현식은 함수표현식 이전에 참조할시 undefined를 반환하고 함수표현식 이후에 참조해야지만 함수리터럴이 평가되어 함수를 식별자로 호출해 사용할수 있다.**
## 5. 함수의 종류

### 5.1. 함수 선언문
        function divine(x,y){
            return x / y;
        }
### 5.2. 함수 표현식
        var divine = function(x,y){
            return x / y;
        }
### 5.3. 생성자 함수
> function 생성자 함수로 함수를 생성하는 것은 바람직하지 않고 일반적인 경우도아니다.<br>함수 선언문이나 함수표현식으로 생성한 함수와 다르게 동작한다.
### 5.4. 화살표 함수(ES6)
> function 키워드 대신에 =>를 사용하여 보다 간략한 방식으로 함수를 선언할 수 있다. 이때 정의되는 함수는 항상 익명함수로 정의한다.
## 6. 함수 호출시 알아둬야할점
### 6.1. 매개변수
> 함수실행에 있어서 필요한값을 함수외부에서 전달받을 경우 매개변수(parameter)를 통해 인수(argument)를 전달받는다.<br> 
- 인수는 값으로 평가될수있는 표현식이어야 하고 함수를 호출할때 인수를 지정해야한다.<br><br>
- 매개변수는 함수를 정의할때 선언해야 하고 함수 몸체내부에서 변수와 동일하게 취급받는다.<br><br>
- 함수가 호출될시 매개변수는 함수 내부에서 암묵적으로 매개변수가 선언되고 undefined로 초기화된이후 인수가 순서대로 할당된다.<br><br>
- **매개변수의 개수와 전달받는 인수의 개수가 다른 경우**<br><br>1. 매개변수의 개수보다 인수가 작을때 : 인수를 전달 받지 못한 매개변수는 undefined로 초기화된 상태에서 값의 재할당이 되지않아 함수내부에서 undefined로 초기화된 값을 가지고있는다.<br><br>2.매개변수의 개수보다 인수의 개수가 많을때 : 초과된 인수는 무시된다. 하지만 암묵적으로 arguments 객체의 프로퍼티로 초과된인수는 보관되고 arguments 객체는 매개변수 개수를 확정할수없는 가변인자 함수를 구현할때 사용된다.
### 6.2. 인수확인
> javascript는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.<br> javaScript는 매개변수의 타입을 사전에 정의할수 없다.<br> <br>**결론 : 자바스크립트 함수는 함수를 정의할때 적절한 인수가 전달되었는지 확인을 해야한다. 또는 단축평가를 통해 매개변수에 기본값을 할당하는 방법을 사용한다.**

        // 단축평가를 통해 undefined가 전달되었을시 변수에 기본값을 할당.
        function add(a, b, c) {
        a = a || 0;
        b = b || 0;
        c = c || 0;
        return a + b + c;
        }

        console.log(add(1, 2, 3)); // 6
        console.log(add(1, 2)); // 3
        console.log(add(1)); // 1
        console.log(add()); // 0

        // ES6는 단축평가대신 이런방식으로 매개변수에 기본값을 할당할수 있다.
        function add(a = 0, b = 0, c = 0) {
        return a + b + c;
        }

        console.log(add(1, 2, 3)); // 6
        console.log(add(1, 2)); // 3
        console.log(add(1)); // 1
        console.log(add()); // 0
### 6.3. 반환문
> 함수는 return 키워드와 반환값으로 이루어진 반환문을 사용하여 실행 결과를 함수 외부로 반환(return)할 수 있다.
#### 6.3.1 반환문의 역할
1. 함수를 실행할시에 반환문을만나게되면 함수실행을 중단하고 함수몸체를 빠져나가게 된다. 때문에 반환문 이후에 다른 문이 존재한다면 그 문은 실행되지않고 함수를 종료한다.<br><br>
1. return 키워드 뒤에 지정한값을 반환한다. return 키워드 뒤에 반환값을 명시적으로 지정하지않으면 그함수는 undefined를 반환한다.<br><br>
1. 함수에 반환문을 생략하게 된다면 그 함수는 몸체의 마지막부분까지 실행한후에 암묵적으로 undefined를 반환하게 된다.
## 7. 함수의 형태
### 7.1. 즉시실행 함수
> 즉시실행 함수는 단한번만 호출되며 다시 실행할수 없다. 따라서 즉시 실행함수는 함수의 이름이 없는 익명함수를 사용하는것이 일반적이다.
- 즉시 실행함수는 반드시 그룹연산자(...)로 감싸줘야한다. => 리터럴로 평가되어 함수객체가됨
- 함수를 먼저 평가하여 객체를 생성할수 있기때문에 그룹연산자 이외에 연산자를 사용할 수 있다.

        (function () {
        // ... 일반적인 방식
        }());

        (function () {
        // ... 화살표 함수를 생각하면 이방식을 쓰자.
        })();

        !function () {
        // ...
        }();

        +function () {
        // ...
        }();
- 즉시 실행함수는 일반함수처럼 값을 반환하고 인수를 전달할수있다.

        res = ( function(a,b){
            return a*b;
        }(123,84));

### 7.2. 재귀함수 (함수로 재귀호출 구현)
> 함수가 자기자신을 계속 호출하는것(recursive function)

        var factorial = function(n){
            if(n<=1) return 1;
            return n * factorial(n-1);
        }
        console.log(factorial(5));
### 7.3. 중첩함수
> 함수 내부에 정의된 함수를 중첩함수(nested function) 혹은 내부함수(inner function)이라고 한다. 그리고 중첩함수를 포함하고 있는 바깥쪽 함수를 외부함수(outer function)라고 한다.

        const outer = function(x){
            let xy112 = x || 100;
            const inner = function(xy112){
                const y = 10;
                let result = xy112 + y;
                return console.log(result);
            }
            inner(xy112);
        }
        outer(100);
### 7.4. 콜백함수
> 어떤 일을 반복하는 repeat 함수

        const repeat = function(step){
            step = step || 1;
            for(let i = 0; i < step; i++){
                console.log(i);
            }
        }
        repeat(10);

- 만약 위에서 정의한 repeat함수에서 새로운 기능을 추가하고 싶다면 repeat 함수와 새롭게 추가할일을 하는 함수를 정의해서 새로운 기능을하는 함수를 외부에서 반복하는 repeat함수 내부로 전달해야한다.

        // repeat 함수 정의
        const repeat = function(step, anyFunction){
            for(let i = 0; i < step; i++){
                anyFunction(i);
            }
        };

        // repeat 함수에 추가할 새로운 기능(함수) 정의
        const tracingAllStep = function(x){
            console.log(x);
        };
        const tracingOdds = function(x){
            const x1 = x || 1;
            if(x%2) console.log(x1);
        };

        // 기능에 따른 repeat함수 호출
        repeat(10,tracingAllStep);
        repeat(20,tracingOdds);
- 이처럼 함수의 매개변수를 통해 전달되는 함수를 콜백함수(Callback function)이라고 하고, 콜백함수를 매개변수로 전달받은 함수를 고차함수(Highter-Order-Function,HOF)라고 한다.
- 고차함수는 콜백함수를 자신의 일부분으로 합성하고 고차함수를 실행하면서 콜백함수를 실행하기 때문에 매개변수로 전달받은 콜백함수의 호출시점을 결정하게된다. => 매개변수로 콜백함수 자체를 전달해야한다. 
- 만약 콜백함수가 고차함수 내부에서만 호출되면 콜백함수를 익명함수 리터럴로 정의하면서 곧바로 고차함수에 전달하는것이 일반적이다.

        const repeat = function(step, anyFunction){
            for(let i = 0; i < step; i++){
                anyFunction(i);
            }
        }
        // 콜백함수가 익명함수인경우
        repeat(10, function(x){
            if(x%3===0) {
                return console.log(x);
            }
        });
- 익명함수를 콜백함수로 지정했을때는 고차함수가 호출될때마다 함수객체가 생성되기때문에 고차함수를 호출할일이 많거나 콜백함수가 다른 고차함수에서도쓰일 경우에는 익명함수로 선언하지 말아야한다.

## 8. 순수함수와 비순수 함수

> 함수형 프로그래밍에서는 어떤 외부 상태에 의존하지도 않고 변경시키지도 않는, 즉 부수 효과가 없는 함수를 순수 함수(Pure function), 외부 상태를 변경시키는 즉, 부수 효과가 있는 함수를 비순수 함수(Impure function)라고 부른다.
- 함수가 외부 상태를 변경하면 상태 변화를 추적하기 어려워진다. 따라서 함수 외부 상태의 변경을 지양하는 순수 함수를 사용하는 것이 좋다.  비순수 함수를 최대한 줄이는 것은 부수 효과를 최대한 억제하는 것과 같다.<br><br>
- 함수형 프로그래밍은 결국 순수 함수를 통해 부수 효과(Side effect)를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 노력의 한 방법이라고 할 수 있다.
