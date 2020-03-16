
# 자바스크립트 객체의 분류
## 1. 표준 빌트인 객체
표준 빌트인 객체(standard built-in objects / native objects / global objects)는 ECMAScript 사양에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공한다. 표준 빌트인 객체는 ECMAScript 사양에 정의된 객체이므로 자바스크립트 실행 환경(브라우저 또는 Node.js 환경)과 관계없이 언제나 사용할 수 있다. 표준 빌트인 객체는 전역 객체의 프로퍼티로서 제공된다. 따라서 별도의 선언없이 전역 변수처럼 언제나 참조할 수 있다.
> 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체이다. 예를 들어 표준 빌트인 객체인 String을 생성자 함수로서 호출하여 생성한 String 인스턴스의 프로토타입은 String.prototype이다.

    // String 생성자 함수에 의한 String 객체 생성
    const strObj = new String('Lee');
    console.log(typeof strObj); // object
    console.log(strObj);        // String {"Lee"}

    // Number 생성자 함수에 의한 Number 객체 생성
    const numObj = new Number(123);
    console.log(typeof numObj); // object
    console.log(numObj);        // Number {123}

    // Boolean 생성자 함수에 의한 Boolean 객체 생성
    const boolObj= new Boolean(true);
    console.log(typeof boolObj); // object
    console.log(boolObj);        // Boolean {true}

    // Function 생성자 함수에 의한 Function 객체(함수) 생성
    const func = new Function('x', 'return x * x');
    console.log(typeof func); // function
    console.dir(func);        // ƒ anonymous(x )

    // Array 생성자 함수에 의한 Array 객체(배열) 생성
    const arr = new Array(1, 2, 3);
    console.log(typeof arr); // object
    console.log(arr);        // (3) [1, 2, 3]

    // RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
    const regExp = new RegExp(/ab+c/i);
    console.log(typeof regExp); // object
    console.log(regExp);        // /ab+c/i

    // Date 생성자 함수에 의한 Date 객체 생성
    const date = new Date();
    console.log(typeof date); // object
    console.log(date);        // Tue Mar 19 2019 02:38:26 GMT+0900 (한국 표준시)
> 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체(예를 들어, String.prototype)는 다양한 기능의 메소드를 제공한다. 또한 인스턴스 없이도 호출 가능한 정적 메소드도 제공한다.

    // 표준 빌트인 객체생성.
    const numObj = new Number(1.5);

    // 표준빌트인 객체의 프로토타입 메소드확인
    console.log(Object.getOwnPropertyNames(numObj.__proto__));

    // 표준 빌트인 객체의 static method 확인
    console.log(Object.getOwnPropertyNames(Number));

    // 프로토타입메서드는 인스턴스를 통해접근.
    console.log(numObj.toString()); 

    // static method는 인스턴스없이 호출가능
    console.log(Number.isInteger('123')); // 문자열 '123'은 number타입이 아니다.
## 2. 호스트 객체
호스트 객체(host objects)는 ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경(브라우저 환경 또는 Node.js 환경. “3.1 자바스크립트 실행 환경” 참고)에서 추가적으로 제공하는 객체를 말한다.
브라우저 환경에서는 DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker와 같은 클라이언트 사이드 Web API를 호스트 객체로 제공하고 Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공한다.
## 3. 사용자정의 객체
사용자 정의 객체(user-defined objects)는 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.
## 4. 원시값과 래퍼객체
> 원시값은 객체가 아니므로 프로퍼티나 메소드를 가질 수 없음에도 불구하고 원시값인 문자열이 마치 객체처럼 동작한다.

    const str = 'hello';

    // 원시 타입인 문자열이 프로퍼티와 메소드를 갖고 있다.
    console.log(str.length); // 5
    console.log(str.toUpperCase()); // HELLO
표준 빌트인 객체가 제공하는 프로토타입 메소드를 사용하려면 반드시 인스턴스를 생성하고 인스턴스로 프로토타입 메소드를 호출해야 한다. 그런데 위 예제를 살펴보면 원시값으로 표준 빌트인 객체의 프로토타입 메소드를 호출하면 정상적으로 동작한다.

이는 원시값인 문자열, 숫자, 불리언 값의 경우, 마치 객체처럼 이들 원시값에 대해 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환해 주기 때문이다. 즉, 원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하고 생성된 객체로 프로퍼티에 접근하거나 메소드를 호출하고 다시 원시값으로 되돌린다.

이처럼 **문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 레퍼 객체(wrapper object)**라 한다.

문자열, 숫자, 불리언, 심볼은 암묵적으로 생성되는 레퍼 객체에 의해 마치 객체처럼 사용할 수 있으며 표준 빌트인 객체인 String, Number, Boolean, Symbol의 프로토타입 메소드 또는 프로퍼티를 참조할 수 있다. 따라서 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 문자열, 숫자, 불리언 인스턴스를 생성할 필요가 없으며 권장하지도 않는다. 
## 5. 전역객체
> 전역 객체(Global Object)는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며 어떤 객체에도 속하지 않은 최상위 객체이다.

전역 객체는 자바스크립트 환경에 따라 지칭하는 이름이 제각각이다. 브라우저 환경에서는 window(또는 self, this, frames)가 전역 객체를 가리키지만 Node.js 환경에서는 global이 전역 객체를 가리킨다.

### 5.1. 전역객체 특징
### 5.2. 빌트인 전역프로퍼티
### 5.3. 빌트인 전역함수
## 6. 암묵적 전역