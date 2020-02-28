# let,const와 블록레벨 스코프
## 1. var 키워드 문제점
> 같은 스코프 내에서 변수를 중복 선언하면 나중에 작성된 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다. 이때 에러는 발생하지 않는다.

### 1.1. 변수 중복선언 가능
> 만약 동일한 변수 이름이 이미 선언되어 있는 것을 모르고 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수값이 변경되는 부작용이 발생한다. 따라서 **변수의 중복 선언은 문법적으로 허용되지만 사용하지 않는 것이 좋다.**
### 1.2. 함수레벨 스코프
> var 변수는 오로지 함수레벨 스코프만은 지역변수로 인정한다. 따라서 제어문을 사용할때 의도치 않게 값이 변경되는 경우가 생길 수 있다.

    var i = 10;
    for(var i = 0; i < 100; i++){
      // doSomthing
    }
    console.log(i);
### 1.3. 변수 호이스팅
> var 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다. 즉, 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있다. 단, 할당문 이전에 변수를 참조하면 언제나 undefined를 반환한다.<br>
**변수 선언문 이전에 변수를 참조하는 것은 변수 호이스팅에 의해 에러를 발생시키지는 않지만 프로그램의 흐름 상 맞지 않을 뿐더러 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.**
## 2. let 키워드 (ES6)
### 2.1. 변수 중복선언금지
> let 키워드로 동일한 이름을 갖는 변수를 중복 선언하면 문법 에러(SyntaxError)가 발생한다.
### 2.2. 블록레벨 스코프
> let 키워드는 모든 코드블록(함수, 제어문등...)을 지역스코프로 인정하는 지역레벨 스코프를 따른다.

    let i = 99;
    const foo = function(){
      let i = 100;
      for( let i = 0; i < 5; i++){
        console.log(i); // 0, 1, 2, 3, 4
      }
      console.log(i); // 100
    }
    foo();
    console.log(i); // 99
### 2.3. 변수 호이스팅(var와 차이점)
> let 변수의 자바스크립트 엔진상의 흐름. 일시적 사각지대의 존재로 호이스팅이 존재하지 않는것처럼 느껴짐.<br>
hoisting -> 일시적사각지대(temporal dead zone; tdz) -> 초기화단계(undefined 할당) -> 할당단계(실질적인 값이 할당)
- var 키워드는 일시적 사각지대가 존재하지않기 때문에 변수가 할당는 런타임시점 이전에 var 키워드로 선언된 변수를 참조하면 undefined를 반환한다.
- 하지만 let 키워드로 선언한 변수는 **선언단계와 초기화단계가 분리되어 실행된다.**

      // 런타임이전에 변수가 선언 되었다 하지만 초기화는 진행되지않아서 변수를 참조할수 없고 참조하게 된다면 reference error (일시적 사각지대)
      console.log(param); // reference error : param is not defined
      let param; // 변수 선언단계
      console.log(param); // param = undefined
      param = 100; // 변수에 값할당
      console.log(param); // 100
### 2.4. 전역객체와 let

    // 전역변수선언
    var x = 1;
    // 암묵적 전역변수
    y = 101;

    console.log(window.x); // 1 => 전역변수 x는 전역객체(window)의 프로퍼티이다.
    console.log(x); // 1 => window객체를 생략해도 변수가 전역변수면 window객체를 생략해도 값을 가져올 수 있다.

    // 암묵적 전역변수도 window객체의 프로퍼티이다.
    console.log(y); // 101
    console.log(window.y); // 101

    // 함수선언문도 전역객체의 프로퍼티이다.
    function foo(){
      // ...
      return console.log('hi');
    }

    console.log(foo); // f foo() { }
    console.log(window.foo); // f foo() { }

    // var 대신 let 키워드를 사용했을때
    let z = 5;

    // let키워드를 사용한 변수는 전역객체의 프로퍼티가 아니다.
    console.log(window.z); // undefined
    console.log(z); // 5
## 3. const 키워드 (ES6)
### 3.1. 선언과 초기화
> const 키워드로 선언된 변수는 반드시 선언과 동시에 할당이 이루어져야한다.<br>
const 키워드로 선언한변수는 let 키워드로 선언한 변수와 마찬가지로 블록레벨 스코프를 가지며 호이스팅이 발생하지 않는 것처럼 동작한다.

    const xyz; // syntaxError : missing initializer in const declaration

### 3.2. 재할당 금지
> var 또는 let 키워드로 선언한변수는 재할당이 자유로우나 const 키워드로 선언한 변수는 재할당이 금지된다.

    const xxx = 1;
    xxx = 2; // type error : assignment to constant variable
### 3.3. 상수
> const 키워드로 선언한 변수에 원시값을 할당할 경우, 변수값을 변경할 수 없다. 이러한 특징을 이용해 const 키워드를 상수를 표현하는데 사용하기도 한다.<br>
**상수는 재할당이 금지된 변수**

      const TAX_RATE = 0.1;  // 변수이름은 대문자로 선언하여 상수임을 명확히 나타낸다. (세율은 변경되지 않을것을 의미)
      let preTaxPrice = 1000000; // 세전 가격
      let aferTaxPrice = preTaxPrice - (preTaxPrice * TAX_RATE); // 세후 가격
      console.log(aferTaxPrice);
- 상수는 프로그램전체에서 공통으로 사용되므로 만약 세율이 변경되면 상수만을 변경하면되기 때문에 유지보수성이 향상된다.
### 3.4. 객체
      const person = { firstName : 'Lee' };
      person.firstName = 'kim'; // 객체는 변경가능한 값이다.
      console.log(person.firstName); // kim
- const 키워드는 재할당을 금지할뿐 "불변"을 의미하지 않는다.<br>
즉, 새로운 값(위 코드에서는 person 객체)을 재할당하는 것은 불가능하지만 객체의 값을 변경할 수 없는 것은 아니다.
## 4. 변수 선언문 결론
> 변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다. 원시 값의 경우, 가급적 상수를 사용하는 편이 좋다. 그리고 객체를 재할당하는 경우는 생각보다 흔하지 않다. const 키워드를 사용하면 의도치 않은 재할당을 방지해 주기 때문에 보다 안전하다.
- ES6를 사용한다면 var 키워드는 사용하지 않는다.

- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요 없는 상수) 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 var, let 키워드보다 안전하다.