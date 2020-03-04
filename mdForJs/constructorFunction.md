# 생성자 함수에 의한 객체 생성
## 1. 생성자 함수
> 생성자(constructor) 함수란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다. 생성자 함수에 의해 생성된 객체를 인스턴스(instance)라 한다.
- 자바스크립트는 object 생성자 함수 외에도 String, Number, Boolean, Function, Array, Date, RegExp등의 빌트인(built-in) 생성자 함수도 제공한다. 하지만 **빌트인 생성자 함수대신 객체리터럴로 객체를 생성하는것이 더 간편하기때문에 특별한 이유가 없다면 굳이 빌트인 생성자함수를 쓸일은 없다.**

      // Function 생성자 함수에 의한 Function 객체(함수) 생성
      const func = new Function('x', 'return x * x');
      console.log(typeof func); // function
      console.dir(func);        // ƒ anonymous(x)

      // Array 생성자 함수에 의한 Array 객체(배열) 생성
      const arr = new Array(1, 2, 3);
      console.log(typeof arr); // object
      console.log(arr);        // [1, 2, 3]

      // RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
      const regExp = new RegExp(/ab+c/i);
      console.log(typeof regExp); // object
      console.log(regExp);        // /ab+c/i

      // Date 생성자 함수에 의한 Date 객체 생성
      const date = new Date();
      console.log(typeof date); // object
      console.log(date);        // Fri Feb 14 2020 17:17:59 GMT+0900 (대한민국 표준시)
### 1.1. 객체 리터럴에 의한 객체생성방식의 문제점
> 객체리터럴에 의한 객체생성방식은 단 하나의 객체만을 생성한다. 따라서 동일한 프로퍼티를 갖는 객체를 여러개 생성해야 하는경우 매번같은 프로퍼티를 기술해야 하기때문에 비효율적이다.

    const square1 = {
      lengthOfSide : 5,
      getArea(){
        return this.lengthOfSide**2;
      }
    };
    console.log(square1.getArea()); // 25

    const square2 = {
      lengthOfSide : 10,
      getArea(){
        return this.lengthOfSide**2;
      }
    };
    console.log(square2.getArea()); // 100

### 1.2. 생성자함수에 의한 객체 생성방식의 장점
> 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.<br><br>
생성자함수는 형식이 정해져 있는 것이 아니라 **일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.**

    function square(length){
      this.lengthOfSide = length;
      this.getArea = function(){
        return this.lengthOfSide**2;
      };
    }
    const square1 = new square(6);
    const square2 = new square(2);
    console.log(square1); // square { lenghtOfSide: 6, getArea:[Function] }
    console.log(square1.lengthOfSide); // 6
    console.log(square1.getArea()); // 36
    console.log(square2.getArea()); // 4
this는 객체 자신의 프로퍼티나 메소드를 참조하기위한 자기 참조 변수이다. **생성자 함수에서 this는 생성자함수가 미래에 생성할 인스턴스를 말한다.**

    function square(length){
      this.lengthOfSide = length + 1;
      this.getArea = function(){
        return lengthOfSide**2;
      };
    }
    // 생성자 함수를 new 연산자를 쓰지않고 일반 함수로 호출
    const square1 = square(2);

    // square 함수자체에 return문이 없으므로 undefined가 반환된다.
    console.log(square1);

    // square함수의 리턴값은 undefined이므로 함수내부의 this바인딩된 변수에 접근할수도 없다.  typeError : Cannot read property 'lengthOfSide' of undefined
    // console.log(square1.lengthOfSide);

    // 일반함수로 호출되었기 때문에 this.lengthOfSide가 가리키는 것은 전역변수 lengthOfSide이다. 전역변수가 존재하지 않을경우 square함수 안에 받은 인자로 재할당된 lengthOfSide값이 리턴된다.
    console.log(lengthOfSide); // 3
### 1.3. 함수의 내부메소드
> 함수는 객체이므로 일반객체와 동일하게 동작할 수 있다. 즉, 함수객체는 일반객체의 내부슬롯과 내부메소드를 모두 가지고 있다.

    const do1 = function(){};

    // 함수는 객체이기 때문에 동적으로 프로퍼티를 추가할수있다.
    do1.prop = 100;

    // 함수는 객체이기때문에 다른함수(메소드) 또한 동적인 추가가 가능하다.
    do1.method = function(){
      return this.prop + 1;
    };

    console.log(do1.prop); // 100
    console.log(do1.method()); // 101

#### 1.3.1. 내부 메소드 [[Call]] & [[Construct]]
>내부 메소드 [[Call]]을 갖는 함수객체를 callable이라고 하며, 내부 메소드 [[construct]]를 갖는 함수객체를 constructor, [[construct]]를 갖지않는 함수객체를 non-constructor라고 부른다.

- callable은 호출할 수 있는 객체, 즉 함수를 말하며 constructor는 생성자 함수로서 호출할 수 있는 객체를 의미한다. 생성자함수로 호출할 수 있다는 것은 new연산자 혹은 super연산자와 함께 호출하는것을 말한다.

- 함수는 호출할 수 있는 객체를 의미하므로 함수객체는 반드시 callable이어야 한다. 따라서 모든 함수는 내부메소드 [[call]]을 가지고 있다.

- 함수 객체는 반드시 [[construct]]를 가지지 않는다. 다시말해 함수객체는 constructor 일수도 있고 non-constructor 일 수 있다.
#### 1.3.2. constructor와 none-constructor의 구분
> 자바스크립트 엔진은 함수를 생성할 때, functionCreate이라는 추상연산을 사용한다. functionCreate으로 함수를 정의할때 3가지 경우의 수가 존재한다.<br><br>1. 일반함수 정의(함수선언문, 함수표현식) 평가 -> normal<br>2. 화살표 함수 정의평가 -> arrow<br>3. 메소드를 정의평가 ->method

    //일반함수 정의
    function foo() {}
    const bar = function(){};
    const baz = { x : function() {} }; // 메소드 정의가 아니라는것에 유의

    // 일반함수로 정의된 함수만이 constructor 이다.
    new foo();
    new bar();
    new baz.x();

    // 화살표 함수정의
    const arrow = () => {};

    new arrow(); // typeError : arrow is not a constructor

    // 메소드 정의 ES6의 메소드 축약표현만을 메소드정의로 인정한다.
    const obj = { x() {} };
    new obj.x(); // typeError : arrow is not a constructor

주의 할점은 생성자 함수로 기대하지 않고 정의한 일반함수(callable이면서 constructor)에 new 연산자를 붙여서 호출하면 생성자함수처럼 동작할 수 있다. 따라서 **생성자 함수는 일반적으로 첫문자를 대문자로하는 파스칼케이스로 명명하여 일반함수와 구분할수 있도록 한다.**
### 1.4. 생성자 함수의 인스턴스 생성과정
> 생성자 함수에서 수행해야하는 것은  인스턴스를 생성하는 것과 생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)하는 것이다.<br> 생성자 함수가 인스턴스를 생성하는것은 필수이고 생성된 인스턴스를 초기화하는것은 옵션이다.

    function foo(param) {
      this.prop = param; // 2.this 바인딩된 인스턴스 초기화(프로퍼티)
      this.decreese = function(){ // 2. this 바인딩된 인스턴스초기화(메소드)
        return  --this.prop;
      };
      // 3. 함수내부의 모든문들을 실행하고 초기화가 끝난 인스턴스를 반환한다.
    }

    // 1.인스턴스 생성과 this 바인딩.
    const some = new foo(100);
    
    console.log(some); // foo { prop: 100, decreese: [Function] }
    console.log(some.prop); // 100
    console.log(some.decreese()); // 99

1. 인스턴스 생성과 this바인딩<br><br>
암묵적으로 빈객체가 생성된다. 암묵적으로 생성된 빈객체가 생성자 함수가 생성한 인스턴스이다. 그리고 생성된 인스턴스는 생성자 함수내부의 this에 바인딩된다. <br>**this가 생성자 함수가 생성할 인스턴스를 가리키는 이유**

1. 인스턴스 초기화<br><br>
생성자 함수 몸체에 있는 코드가 실행되면서 this에 바인딩되어있는 인스턴스를 초기화한다. 즉, this에 바인딩되어있는 인스턴스에 프로퍼티나 메소드를 추가하고 생성자함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.
1. 인스턴스 반환<br><br>
생성자 함수 내부의 모든처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 바인딩된다.<br>
만약 this가 아닌 다른객체를 명시적으로 반환하면 this가 반환되지 못하고 return문에 명시한 객체가 반환된다.<br>
하지만 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.<br>
**이처럼 생성자 함수내부에서 명시적으로 this가아닌 다른값을 반환하는것은 생성자 함수의 기본동작을 훼손하기 때문에 생성자함수 내부에선 return문을 반드시 생략해야한다.**
#### 1.4.1. new 연산자
      // 원시 리터럴을 반환하는 함수
      function add(x,y){
        return x + y;
      }
      let instance = new add(1,6); // 생성자함수가 아닌 constructor 함수를 new 연산자와 함께 호출

      // 함수가 객체를 반환하지 않았으므로 return문은 무시.
      console.log(instance); // undefined

      // 객체를 반환하는 함수
      function createUser(name, role){
        return { name, role };
      }

      instance = new createUser('Lee','admin');
      // 함수가 객체를 반환하므로 값이 찍힌다.
      console.log(instance); // { name:'Lee', role:'admin' }

      //생성자 함수 
      function circle(radius){
        this.radius = radius;
        this.getCircleArea = function(){
          return this.radius**2 * 3.14;
        }
      }

      // 생성자 함수를 new연산자 없이 생성
      const circle = circle(10);

      console.log(circle); // undefined
      
      // new 연산자 없이 호출되었기 때문에 this가 가리키는 객체는 전역객체 window이다.
      console.log(radius); // 10
      
      // this선언된 함수도 마찬가지. 전역객체화 되었기 때문에 바로부를수 있다.
      console.log(getCircleArea()); // 314

      // TypeError: Cannot read property 'getDiameter' of undefined
      console.log(circle.getCircleArea());

- 일반함수 객체와 생성자함수 객체의 차이는 따로없기 때문에 생성자함수의 경우는 파스칼케이스로 명명해서 일반함수와 구분할 수 있도록 한다.
#### 1.4.2. new.target
> new 연산자 없이 생성자 함수를 호출하는 것을 방지하기 위해 파스칼 케이스 컨벤션을 사용한다 하더라도 실수는 언제나 발생할 수 있다. 이러한 위험성을 회피하기 위해 ES6에서는 new.target을 지원한다.

new.target은 this와 유사하게 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티(meta propery)라고 부른다. IE는 new.target을 지원하지 않으므로 주의해야한다.

함수 내부에서 new.target를 사용하면 new 연산자와 함께 함수가 호출되었는지 확인할 수 있다. 함수가 new 연산자와 함께 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 호출된 함수 내부의 new.target은 undefined이다.

    // 생성자 함수
    function Circle(radius) {
      // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
      if (!new.target) {
        // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
        return new Circle(radius);
      }

      this.radius = radius;
      this.getDiameter = function () {
        return 2 * this.radius;
      };
    }

    // new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
    const circle = Circle(5);
    console.log(circle.getDiameter());

**스코프 세이프 생성자(Scope-Safe Constructor) 패턴**<br>
new.target은 ES6에서 도입된 최신 문법으로 IE에서는 지원하지 않는다. new.target을 사용할 수 없는 상황이라면 스코프 세이프 생성자(Scope-Safe Constructor) 패턴을 사용할 수 있다.

    // Scope-Safe Constructor Pattern
    function Circle(radius) {
      // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
      // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

      // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
      // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
      if (!(this instanceof Circle)) {
        // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
        return new Circle(radius);
      }

      this.radius = radius;
      this.getDiameter = function () {
        return 2 * this.radius;
      };
    }

    // new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
    const circle = Circle(5);
    console.log(circle.getDiameter()); // 10