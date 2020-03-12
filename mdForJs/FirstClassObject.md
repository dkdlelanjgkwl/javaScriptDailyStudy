# 함수와 일급객체
## 1. 일급객체란?
> 1.무명의 리터럴로 생성할 수 있다. 런타임에 생성가능<br><br>2. 변수나 자료구조(객체, 배열등)에 저장할 수 있다.<br><br>3. 함수의 매개변수로 전달 할 수 있다.<br><br>4. 함수의 결과값으로 반환할 수 있다.<br><br>함수는 객체이지만 일반 객체와는 차이가 있다. 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있다. 그리고 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.

    // 1. 함수는 무명의 리터럴로 생성할수있다.
    // 2. 변수 factorial에 저장할수있다.
    // 1. 런타임에 함수리터럴이 평가되어 함수객체가 생성되고 변수에 할당된다.
    const factorial = function(num){
      if(1>=num) return 1;
      return num * factorial(num-1);
    };

    // 2. 객체 obj 에 저장할 수 있다.
    const obj55 = { factorial };

    // 3. 함수의 매개변수에 전달하고 4. 함수의 반환값으로 사용할 수 있다.

    function mathSomthing(obj55, int){

      const num = int==undefined ? 5 : init;
      return function(){
        result = obj55(num);
        return result;
      };
    }

    let fac = mathSomthing(obj55.factorial, 5);
    console.log(fac()); // 120
    fac = mathSomthing(obj55.factorial, 10);
    console.log(fac()); // 3628800

## 2. 함수객체의 프로퍼티
> console.dir() 메소드를 사용해서 함수내부의 프로퍼티를 확인할 수 있다.<br>
일반 객체에서는 볼 수 없는 arguments, caller, length, name, prototype 프로퍼티가 존재한다.
### 2.1. arguments 프로퍼티
> arguments 프로퍼티는 함수 호출 시 전달된 인수(argument)의 정보를 가지고 있는 순회가능한 유사배열 객체이며 함수내부에서 지역변수처럼 사용된다.

함수를 정의할 때 선언된 매개변수는 함수내부에서 변수와 동일하게 취급한다. 함수를 호출하면 함수의 매개변수는 undefined로 초기화 된후 할당문에 따라 다시 인수의 재할당이 된다.
- 선언된 매개변수보다 인수를 적게 전달되었을 때는 undefined로 초기화된 상태에서 재할당이 이루어 지지 않으므로 undefined값을 계속 가지고 있는다.

- 선언된 매개변수보다 인수를 많이 전달했을 경우에는 초과된 인수는 무시가된다. 이때 초과된 인수는 암묵적으로 arguments객체의 프로퍼티로 보관된다.

- arguments객체는 인수를 프로퍼티 값으로 소유하고 키값은 전달받은 인수의 순서를 나타낸다.

- iterator(이터레이터)는 arguments객체의 symbol(Symbol.iterator)프로퍼티는 arguments객체를 순회가능한 구조로 만들기위한 프로퍼티다.

      function multiply(x,y){
        // 이터레이터 호출
        const iterator = arguments[Symbol.iterator]();

        // 호출한 이터레이터의 next() 메소드로 arguments객체를 순회(여기서는 4회 순회)
        console.log(iterator.next()); // { value : 1, done: false }
        console.log(iterator.next()); // { value : 2, done: false }
        console.log(iterator.next()); // { value : 3, done: false }
        console.log(iterator.next()); // { value : undefined, done : true }

        return x*y;
      }
      multiply(1,2,3);
- arguments 객체는 매개변수 개수를 확정할 수 없는 가변인자 함수를 구현할때 유용하게 사용된다.

      function sum(){
        let res = 0;
        // arguments 객체는 유사배열 객체이므로 for문으로 순회는 가능하지만 배열메소드를 사용할 수는 없다.
        for(let i = 0; i < arguments.length; i++){
          res += arguments[i];
        }
        return res;
      }
      console.log(sum()); // 0
      console.log(sum(1,2)); // 3
      console.log(sum(1,2,3)); // 6
- 유사배열 객체인 arguments객체는 배열메소드를 사용하기 위해서  Function.prototype.call, Function.prototype.apply를 사용해 간접 호출해야 하는 번거로움이 있다<br><br> 이를 해결하기 위해서 ES6에선 Rest파라미터를 도입했다.
### 2.2. caller 프로퍼티
> caller 프로퍼티는 ECMAScript 스펙에 포함되지 않은 비표준 프로퍼티이다. 이후 표준화될 예정도 없는 프로퍼티이므로 사용하지 말고 참고로만 알아두면됌. 
### 2.3. length 프로퍼티
> length 프로퍼티는 함수 정의시 선언한 매개변수의 개수를 가리킨다.<br> **arguments객체의 length는 인자의 개수를 가리키는것이고 length프로퍼티는 매개변수의 개수를 말하는것이므로 혼동하지 않도록 주의**
### 2.4. name 프로퍼티
> 함수객체의 name프로퍼티는 함수의 이름을 가리킨다.<br>여기서 주의할점은 익명함수표현식이 ES5와 ES6에서 동작을 달리하는것이다. ES5에선 name프로퍼티를 빈문자열을 가지지만 ES6에선 name프로퍼티는 함수객체를 가리키는 변수이름을 값으로 가진다.
### 2.5. __proto__접근자 프로퍼티
> 모든 객체는 [[prototype]]이라는 내부 슬롯을 가진다. [[prototype]]내부슬롯은 객체지향 프로그래밍에서 상속을 구현하는 prototype 객체를 가리킨다.<br><br>
__proto__프로퍼티는 [[prototype]] 내부메소드가 가리키는 프로토타입 객체에 접근하기 위해 사용되는 접근자 프로퍼티이다.

    const obj = { a : 1 };

    // 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 object.prototype 이다.
    console.log(obj.__proto__ === Object.prototype); //true

    // 객체리터럴 방식으로 생성한 객체는 object.prototype의 프로퍼티를 상속받는다.
    // hasOwnProperty 는 object.prototype에게 상속받은 메소드 이다. (__proto__는 단지 object.prototype객체에 접근하기위한 용도일뿐..)
    console.log(obj.hasOwnProperty('a')); // true 상속받은 프로퍼티가 아니다.
    console.log(obj.hasOwnProperty('__proto__')); // false 상속받은 프로퍼티이다.
### 2.6. prototpye 프로퍼티
> prototype 프로퍼티는 함수객체만이 가지고있는 프로퍼티이다. 일반객체는 prototype 프로퍼티를 가지고있지 않다.