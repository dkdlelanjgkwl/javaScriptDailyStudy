# 프로토타입
## 1. 객체지향이란?
> 실체는 특징이나 성질을 나타내는 속성(attribute, prorperty)을 가지고있고 이를 통해 실체를 인식하거나 구분할 수 있다. 그리고 다양한 속성중에 프로그램에 필요한 속성만을 간추려 내어 표현하는것을 추상화(abstraction)라고 한다.

    const BigCat = {
      species : 'lion',
      color : 'yellow',
      location : { now : [1,0,0,0,0,0,0,0,0,0,0,0] }, 
      stamina : 10,
      behavior : 'nocturnal',
      move(x,time,stamina) {
        if( time < night && stamina <= 0 ){
          return 'message : cannot move!!';
        } 
        else {
          bigCat.location.now[x].push(1);
          bigCat.stamina = stamina;
          move(x, time + 1, stamina - 1);  
        }
      }
    }
- 객체란 이처럼 속성을 통해 여러개의 값을 하나의 단위로 구성한 복합적인 자료

- 객체의 상태(state)를 나타내는 데이터와 상태데이터를 조작할 수 있는 동작(behavior)을 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.

## 2. 상속(Inheritance)과 프로토타입
> 객체지향 프로그래밍의 핵심개념으로 어떤 객체의 프로퍼티 또는 메소드를 다른 객체가 상속받아 그대로 사용할 수 있는 것.<br>
**자바스크립트는 프로토타입을 기반으로 상속을 구현**하고 불필요한 중복을 제거한다.

    // 생성자 함수 정의
    function Circle(radius){
      this.radius = radius;
    }

    // 프로토타입으로 생성자 함수에 상속시킬 메서드를 정의
    // 생성자 함수의 프로토타입에 getArea메소드를 바인딩
    Circle.prototype.getArea = function (){
      return Math.PI * Math.pow(this.radius,2);
    };

    // 생성자 함수로 인스턴스 생성
    const circle1 = new Circle(5);
    const circle2 = new Circle(7);
    
    // 프로토 타입으로 상속시킨 메소드를 호출
    console.log(circle1.getArea === circle2.getArea); // true
    console.log(circle1.getArea()); 
    console.log(circle2.getArea());
## 3. 프로토 타입객체
> 모든 객체는 [[prototype]]이라는 내부 슬롯을 갖는다. 모든 객체는 생성될때 [[prototype]]내부슬롯의 값으로 프로토 타입의 참조를 저장한다. 즉, 모든 객체는 하나의 프로토 타입을 가지며 프로토 타입은 객체의 생성방식에 의해 결정된다.

모든 객체는 하나의 프로토타입을 갖는다. 모든 프로토타입은 null 이거나 객체이다. 그리고 프로토타입은 생성자 함수와 원형연결리스트(circulary linked list) 형식의 데이터구조를 가지고 있다.

- 이때 생성자 함수로 만들어진 인스턴스들은 __proto__라는 접근자를 통해 생성자 함수의 프로토타입의 값에 접근 할 수있다.
### 3.1. __proto__접근자 프로퍼티
> 모든 함수는 __ proto__ 접근자 프로퍼티를 통해 자신의 프로토 타입, 즉 [[prototype]]내부슬롯에 접근할 수 있다.

접근자 프로퍼티는 자체적으로는 값을 갖지않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수들로 구성된 프로퍼티이다.
- Object.prototype의 프로퍼티인 __proto__접근자 프로퍼티는 getter/setter 함수라고 부르는 접근자 함수를 통해 [[prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.<br><br>
 __proto__접근자로 프로토타입에 접근하면 get __proto__가 호출된다.<br><br> __proto__접근자로 새로운 프로토 타입을 할당하면 set __proto__가 호출된다.

      // 프로토 타입을 교체해서 다른객체의 값 사용하기
      const obj = {};
      const some = { x : 1 };

      obj.__ proto__ ; // obj 객체의 프로토 타입가져오기. get __proto__호출
      obj.__proto __ = some; // obj 객체의 프로토타입을 some객체의 프로토타입값으로 교체. set __proto__ 호출

      console.log(obj.x); // 1
- __proto__접근자 프로퍼티는 상속을 통해 사용된다.<br><br>
__proto__접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티이다. 모든 객체는 상속을 통해 Object.prototype.__proto__접근자 프로퍼티를 사용할 수 있다. (이유 : 프로토타입 체인)

- __proto__접근자 프로퍼티를 통해 프로토타입에 접근하는이유<br><br>
상호참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함.

        const parent = {};
        const child = {};

        // child의 프로토타입을 parent로 지정
        child.__proto__ = parent;
        // parent의 프로토타입을 child로 설정
        parent.__proto__ = child; // TypeError: Cyclic __proto__ value
- __proto__접근자 프로퍼티를 코드내에서 집접사용하는것은 비추천
모든 객체가 __proto__접근자 프로퍼티를 사용하는 것은 아니다.<br><br> 직접상속을 통해서 Object.prototype을 사용하지 않는 객체를 생성 할 수도 있기 때문.
<br>따라서 __proto__접근자 프로퍼티 대신 **프로토타입 참조를 취득할 경우는 Object.getPrototypeOf** 메소드를 사용하고 **프로토타입을 교체하는경우는 Object.setPrototypeOf** 메소드를 사용하는것을 권장

        const obj = {};
        const parent = { x : 1 };

        Object.getPrototypeOf(obj);
        Object.setPrototypeOf(obj, parent);

        console.log(obj.x); // 1
### 3.2. 함수의 prototype
> 함수객체는 __proto__접근자 프로퍼티 이외에 prototype 프로퍼티도 가지고있다. **함수객체의 prototype은 생성자 함수가 생성할 인스턴스의 프로토타입을 가르킨다.**<br>
prototype 프로퍼티는 함수 객체만이 소유하는 프로퍼티이다. <br>일반객체에는 prototype프로퍼티가 없다.<br>

prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 사용될때, 생성자 함수가 생성할 객체(instance)의 프로토타입을 가르킨다.
<br><br> Arrow, Method인 함수(non-constructor)는 프로토타입을 생성하지도 않고, prototype 프로퍼티도 소유하지 않는다.
<br><br>
모든 객체가 가지고있는 __proto__접근자 프로퍼티와 함수객체만 가지고 있는 prototype 프로퍼티는 동일한 객체를 가르킨다.

      // 생성자 함수
      function Output(input){
        this.input = input;
      }

      // 인스턴스 생성
      const mass = new Output('meterial');

      // 함수의 prototype객체와 __proto__접근자로 가리키는 객체가 같은지 확인
      console.log(mass.__proto__ === mass.prototype); //false 생성자 함수가 생성한 인스턴스(객체)는 prototype을 가지고있지않다(undefined)

      console.log(Output.prototype === mass.__proto__); // true
### 3.3. 프로토 타입의 constructor 프로퍼티와 생성자함수
> 모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 prototype프로퍼티로 자신을 참조하고있는 생성자 함수를 가르킨다.<br> 이 연결은 생성자 함수가 생성될때, 즉 함수객체가 생성될때 이루어진다.

      function Output(input){
        this.input = input;
      }

      // 새로운 인스턴스를 생성하면서 함수의 prototype과 instance간의 단방향 linked list가 생성된다.
      const mass = new Output('meterial');

      // 확인
      console.log(mass.constructor === Output.prototype); //false
      console.log(mass.__proto__ === Output.prototype); // true
      console.log(mass.constructor === Output); // true
## 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토 타입
1. 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다. 

1. 리터럴 표기법에 의한 객체생성방식 같이, 명시적으로 new 연산자와 함께 생성자함수를 호출하여 인스턴스를 생성하지않는 객체생성방식도 존재.

1. 하지만 리터럴 표기법으로 생성한 객체는 prototype의 constructor 프로퍼티가 가르키는 객체가 반드시 객체를 생성한 생성자 함수라고 할 수 없음.

        const obj = {};
        const arr = [];

        // 객체리터럴 방식으로 생성을 하면 js내부에서 추상연산 ObjectCreate를 호출하여 빈객체를 생성하고 프로퍼티를 추가하도록 되어있다.

        console.log(obj.constructor); // [Function: Object] 

        console.log(arr.constructor); // [Function: Array] 
        
        // 함수선언문의 경우
        function foo(){}

        console.log(foo.constructor); // [Function: Function]
1. 위의 코드를 보면 마치 각각의 객체를 Object, Array, Function이 생성하는 것 처럼보인다.

1. 하지만 objectCreate으로 생성을 할때 new.target확인이나 프로퍼티 추가하는 등 세부적인 내용은 다르다. 때문에 객체리터럴에 의해 생성된 객체는 Object,Array, Function생성자 함수가 생성한 객체가 아니다.

1. **결론 : 리터럴 표기법으로 생성된 객체는 생성자함수가 생성하는 객체가 아니다. 하지만 객체리터럴에 의해 생성된 객체와 new를 사용해서 생성자함수로 생성하는 객체와의 차이점은 없고, 똑같이 객체로써 동일한 특성을 갖는다. 따라서 리터럴로 생성한 객체의 prototype의 constructor 프로퍼티가 가리키는 함수가 리터럴표기법으로 생성한 객체의 생성자함수라고 생각해도 괜찮다.**

리터럴 표기법 | 생성자 함수 | 프로토타입
:---:|:---:|:---:
객체리터럴 | Object | Object.prototype
함수리터럴 | Function | Function.prototype
배열리터럴 | Array | Array.prototype
정규표현식 리터럴 | RegExp | RegExp.prototype
## 5. 프로토 타입의 생성시점
### 5.1. 사용자 정의 생성자 함수와 프로토타입 생성시점
> 생성자함수로 호출할 수 있는함수(constructor)는 함수의 정의가 평가되어 함수객체를 생성하는 시점에 프로토 타입이 생성된다.<br> non-constructor는 프로토 타입이생성되지 않는다.

빌트인 생성자 함수가 아닌 사용자 정의 생성자함수는 자신이 평가되어 함수객체가 되는 시점에 프로토 타입도 생성되며(이때 생성되는 프로토 타입은 프로퍼티로 constructor만을 가지는 프로퍼티이다. 즉 함수 자체의 프로토 타입) 이때 생성된 프로토 타입의 프로토 타입(__proto__식별자로 얻을수있는 프로토타입)은 항상 Object.prototype이 된다. 생성자함수는 결국 객체를 만들어내기 때문..
### 5.2. 빌트인 생성자 함수와 프로토타입 생성시점
> 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토 타입이 생성된다. 때문에 모든 빌트인 생성자함수는 전역객체가 생성되는 시점에 프로토타입이 생성된다고 생각할 수 있다.
## 6. 객체 생성방식과 프로토타입의 결정
객체의 생성방식에는 생성자 함수, 객체리터럴, Object생성자 함수, Object.create 메소드, 클래스(ES6)의 방식이 있다. <br>
이처럼 다양한방식으로 생성한 객체는 각각의 세부적인 객체생성방식의 차이는 있을 수 있지만 큰틀에서 보면 ObjectCreate 추상연산을 사용하여 객체가 생성된다는 공통점을 가진다.
> 추상연산 Objectcreate는 필수적으로 자신이 생성할 객체의 proto 타입을 인수로 전달받는다. 그리고 빈객체를 생성한 후 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가한다 <br> 그리고 인수로 받은 프로토 타입을 자신이 생성할 인스턴스의 내부슬롯 [[prototype]]에 할당한 다음 객체를 반환한다.<br> 즉 프로토타입은 추상연산 Objectcreate에 전달되는 인수(proto)의해 결정되고 이 proto인수는 객체가 생성되는 시점에 객체 생성방식에 의해 결정된다. 
### 6.1. 객체리터럴에 의해 생성된 객체의 프로토타입
> 객체 리터럴에의해 생성되는 객체의 프로토타입은 Object.prototype이다. 

객체리터럴을 평가하고 객체를 생성할때 Objectcreate추상연산을 호출 하고 Object.prototype을 전달받는다. 즉, 객체리터럴로 생성되는 객체의 프로토타입은 Object.prototype이다.

    const bbc = { x : 1 };

    // 객체리터럴로 생성된 객체의 프로토타입확인
    console.log(bbc.__proto__ === Object.prototype); // true

    // 객체리터럴로 생성된 객체의 생성자함수 확인
    console.log(bbc.constructor === Object); // true

    // 리터럴로 생성된 객체의 프로토타입이 가지고 있는 프로퍼티 확인
    const bb1 = Object.getOwnPropertyNames(bbc.__proto__);
    console.log(bb1);

    // [
    //   'constructor',
    //   '__defineGetter__',
    //   '__defineSetter__',
    //   'hasOwnProperty',
    //   '__lookupGetter__',
    //   '__lookupSetter__',
    //   'isPrototypeOf',
    //   'propertyIsEnumerable',
    //   'toString',
    //   'valueOf',
    //   '__proto__',
    //   'toLocaleString'
    //  ]

    // 리터럴로 생성된 객체는 Objcet.prototype과 __proto__ 식별자로 연결되있고 Object.prototype의 프로퍼티를 상속받아 사용할수 있다.
    console.log(bbc.constructor); // 상속받은 constructor프로퍼티 사용
    console.log(bbc.hasOwnProperty('x')); // 상속받은 hasOwnProperty프로퍼티 사용
 
### 6.2. Object 생성자 함수의해 생성된 객체의 프로토타입
> Object생성자 함수에 의해 생성되는 객체의 prototype은 Object.prototype이다.

객체리터럴과 Object생성자 함수의 객체생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다. 객체 리터럴은 객체리터럴 내부에 프로퍼티를 추가하지만 Object 생성자 함수는 일단 빈객체를 생성한 후 프로퍼티를 추가해야한다.

    const yyy = new Object(); // 빈객체생성
    yyy.x = 1; // 프로퍼티추가

    // 이후 Object.prototype을 상속받아 프로퍼티를 사용할 수 있는것은 똑같음.
    console.log(yyy.constructor); // true
    console.log(yyy.hasOwnProperty('x')); // true
### 6.3. 생성자 함수에 의해 생성된 객체의 프로토타입
> 다른객체와 마찬가지로 Object.create 추상연산을 호출하고 생성자함수의 prototype프로퍼티에 바인딩된 객체를 Object.create로 전달한다.<br> 즉, **생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자함수 prototype에 바인딩 되어있는 객체이다.**

    function Something(whatever){
    this.value = whatever;
    return this.value;
    }
    const newFuncObj = new Something('zz');

    // 생성자함수의 prototype과 생성자함수로 생성한 객체의 prototype은 같음을 증명.
    console.log(newFuncObj.__proto__); // Something {}
    console.log(Something.prototype); // Something {}
    console.log(newFuncObj.__proto__ === Something.prototype); // true

    // 생성자 함수의 프로토타입과 생성자함수는 다른것임을 증명.
    console.log(newFuncObj.constructor); // [Function: Something]
    console.log(newFuncObj.__proto__); // Something {}
    console.log(newFuncObj.constructor === newFuncObj.__proto__); // false

    // 생성자함수의 프로토타입과 생성자함수 간 프로퍼티 차이점
    let abcde = Object.getOwnPropertyNames(newFuncObj.__proto__); 
    console.log(abcde); // [ 'constructor' ]
    abcde = Object.getOwnPropertyNames(newFuncObj.constructor);
    console.log(abcde) ; // [ 'length', 'name', 'arguments', 'caller', 'prototype' ]

위 코드의 생성자함수의 프로토타입에 프로퍼티를 추가하여 자식객체가 상속을 받을 수 있도록 코드를 구현할수있다.<br> 그리고 프로토 타입객체에 프로퍼티를 추가하거나 삭제할 수 있고 이는 즉각적으로 프로토 타입체인에 반영된다.

    function Something(whatever){
      this.value = whatever;
    }

    // 생성자 함수가 가진 프로토타입객체에 프로퍼티 추가.
    Something.prototype.doSomething = function(){
      result = this.value + 100;
      return result;
    };
    Something.prototype.y = 1000;
    Something.prototype.original = this.value+1;

    const abcd = new Something(1);
    const aabb = new Something(100);

    // 생성자함수가 만든객체는 생성자함수의 prototype에 추가한 메서드나 객체의 값에 접근할 수 있다.
    console.log(abcd.doSomething()); // 101
    console.log(aabb.doSomething()); // 200
    console.log(abcd.y); // 1000
    console.log(abcd.original); // nan???
    console.log(aabb.original); // nan??

## 7. 프로토타입 체인
> 자바스크립트는 객체의 프로퍼티(메소드 포함)에 접근하려고 할 때 해당객체에 접근하려는 프로퍼티가 없다면 __proto__접근자 프로퍼티가 가리키는 링크를 따라 자신의 부모역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. <br> 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘이다.

    function Cafe(cafeName){
      this.name = cafeName;
    }

    const myCafe = new Cafe('dotax');

    // 프로토타입 체인 증명

    // 생성자함수가 생성한 객체는 상위 프로토타입으로 생성자함수의 프로토타입을 가진다.
    console.log(Object.getPrototypeOf(myCafe) === Cafe.prototype); // true

    // 생성자 함수가만든 객체의 프로토타입의 상위 프로토 타입은 Object.prototype이다.
    console.log(Object.getPrototypeOf(Cafe.prototype) === Object.prototype); //true

    // 생성자 함수자체의 상위 프로토타입은 Function.prototype이다.
    console.log(Object.getPrototypeOf(Cafe) === Function.prototype); //true

    // Function.prototype의 상위 프로토타입은 Object.prototype이다.
    console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype); // true

    // 여기서 주의할 점은 생성자함수가 객체를 만들때 생성되는 prototype은 constructor 함수가 가지고 있는 내부 프로퍼티의 prototype이다. 생성자함수 자체의 prototype과는 다르다.

    // Cafe 생성자함수의 모든프로퍼티확인 -> prototype을 가지고있는것을 알 수 있다. 하지만 이 prototype은 새로운 객체를 생성할때 객체의 상위 프로토타입을 가지기위해 가지고있는 프로퍼티일뿐이다. 생성자함수의 상위 프로토타입과는 상관이없다.
    console.log(Object.getOwnPropertyNames(Cafe)); // [ 'length', 'name', 'arguments', 'caller', 'prototype' ]
    console.log(Object.getPrototypeOf(Cafe) === Object.getPrototypeOf(myCafe)) // false


위 코드를 보면 모든 프로토타입의 최상위에는 Object.prototype이 있다. 따라서 **모든 객체는 Object.prototype을 상속**을 받는다. 또 Object.prototype을 프로토 타입체인의 종점이라고한다 (End of prototype chain). Object.prototype의 [[prototype]] 슬롯의 내부값은 null이다.<br> 그리고 프로토타입 체인 종점에서 존재하지 않는 프로퍼티를 검색할 경우 undefined를 반환한다. 이때 에러가 발생하지않는 점을 주의하자.

    function Cafe(cafeName){
      this.name = cafeName;
    }
    Cafe.prototype.getCafeName = function(){
      console.log(`지금 방문하신 카페는 ${this.name}입니다.`);
    };
    const myCafe = new Cafe('dotax');

    // 스코프체인에 의한 프로퍼티검색 증명

    // 생성자 함수로 만든 myCafe객체에는 hasOwnProperty() 메소드가 존재하지않지만 메소드를 사용가능하다. 이 메소드가 현재객체내에 존재하지 않으므로 상위 프로토타입을 검색한다.
    console.log(myCafe.hasOwnProperty('name')); //true

    // 상위 프로토 타입체인(Cafe.prototype)에서 hasOwnPrototpye메소드검색
    console.log(Object.getOwnPropertyNames(Cafe.prototype)); // [ 'constructor', 'getCafeName' ]

    // 상위 프로토타입 체인에서 검색을 했을시에 contructor와 getCafeName 만존재하므로 다시 상위 프로토타입(Object.prototype)을 검색

    console.log(Object.getOwnPropertyNames(Object.prototype));
    // [
    //   'constructor',
    //   '__defineGetter__',
    //   '__defineSetter__',
    //   'hasOwnProperty', 존재하므로 이 프로퍼티를 상속받아서 사용하는 것이다.
    //   '__lookupGetter__',
    //   '__lookupSetter__',
    //   'isPrototypeOf',
    //   'propertyIsEnumerable',
    //   'toString',
    //   'valueOf',
    //   '__proto__',
    //   'toLocaleString'
    // ]
## 8. 캡슐화
> 즉시실행 함수로 생성자함수의 정의, 생성자함수의 프로토 타입 메소드정의를 하고 생성자함수자체를 리턴하여 리턴한 생성자함수로 객체를 생성하는방식.

    const Calculator = (function(){
      let _x = 0;
      let _y = 0;

      function Calc(x,y){
        _x = x;
        _y = y;
      }

      Calc.prototype.add = function(){
        result = _x + _y;
        return result;
      }
      
      console.log(Calc);
      
      return Calc;
    })();

    const done = new Calculator(10,50);

    // Calc.prototype.add = function(){} 을 할당할때의 변수 스코프를 기억하고있다.( 여기선 생성자함수를 호출할때 바인딩되는 _x 그리고 _y 값을 계속 기억하고있다. )
    console.log(done.add()); // 60

    // 즉시실행함수에 의해 prototype에 기억해두었던 메서드나 변수를 제외하고 모든 변수들의 생명주기는 끝나있는상태. 따라서 값의 재할당도 불가능
    done.x = 50;
    console.log(done.add()) // 100을 예상하였지만 즉시실행함수를 호출할때 인수로 받았던 _x의 값은 변하지 않았다..
## 9. 오버라이딩과 프로퍼티 쉐도잉
> 상속받은 메서드를 하위객체에서 메소드의 내용만 변경해서 재사용하는것을 오버라이딩이라고한다.<br> 하위객체에서 오버라이딩이 일어나면 하위객체에게 메소드를 상속해주는 상위 프로토타입객체의 메소드는 하위객체에서 접근할수 없는 문제점이 생기는데 이것을 프로퍼티 쉐도잉이라고 한다.


## 10. 프로토타입의 교체
## 11. instanceof 연산자
## 12. 직접상속
### 12.1. Object.create에 의한 직접상속
### 12.2. 객체리터럴 내부에서 __proto__에 의한 직접상송
## 13. 정적프로퍼티 / 메소드
## 14. 프로퍼티 존재확인
## 15. 프로퍼티 열거
### 15.1. for...in문
### 15.2. Object.keys/values/entries 메소드