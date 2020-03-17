# this
## 1. this 키워드
> 동작을 나타내는 메소드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다. 이때 메소드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.
<br>**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(Self-referencing variable)이다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메소드를 참조할 수 있다.**

this는 자바스크립트 엔진에 의해 암묵적으로 생성되며 코드 어디에서든지 참조할 수 있다. 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼 this도 지역 변수처럼 사용할 수 있다. 단, this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

    const someThing = {
      someProp: 100,
      // 객체리터럴 내부에서 this는 메소드를 호출한 객체를 가리킨다.
      someMethod() {
        return this.someProp;
      }
    };
    console.log(someThing.someMethod()); // 100

    // 생성자함수 내부에서 this는 생성자함수가 미래에 호출할 인스턴스를 지칭한다.
    function Ow(heroName) {
      this.hero = heroName;
    }
    Ow.prototype.getMyHero = function () {
      return this.hero;
    };
    const myHero = new Ow('widow');
    console.log(myHero); // widow
하지만 this는 객체의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메소드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다. 일반 함수 내부에서 this를 사용할 필요가 없기 때문이다.

## 2. 함수호출 방식과 this바인딩
### 2.1. 일반함수 호출
> 기본적으로 this에는 전역 객체(Global object)가 바인딩된다.<br> 어떤 함수든 간에 일반함수로 호출되면 함수내부의 this에는 전역객체가 바인딩된다.<br> var 키워드로 선언된 변수는 전역객체의 프로퍼티가된다.

    // var 키워드로 선언한 변수는 전역객체의 프로퍼티가 된다.
    var value = 1000;

    // 메소드 내에서 정의한 중첩함수
    const obj = {
      value: 999,
      foo() {
        console.log('under this line is foo');
        console.log('this.value: ', this.value); // 999
        console.log('this', this); // this { value: 999, foo: [Function: foo] }
        function bar() {
          console.log('under this line is bar');
          console.log('bar this.value: ', this.value); // strict mode or eslint -> undefined / no rules -> window.value = 1000
          console.log('bar this: ', this); // Object [global] { ... }
        }
        // 메소드내부에서 정의 되었지만 일반함수로 호출되었기때문에
        // window.bar();로 호출되어 this가 가리키는 값은 window가 된다.
        bar();
      }
    };
    obj.foo();

    // 콜백함수내부
    const obj2 = {
      value: 'valueOfObj2',
      foo() {
        console.log('this.value in obj2: ', this.value); // valueOfObj2

        // 화살표 함수로 콜백함수를 정의했을때 콜백함수의 this는 자신을 호출한 obj2 객체를 가리킨다.
        setTimeout(() => {
          console.log('case1: callback function is arrow function');
          console.log('this.value in callbackFunction: ', this.value); // valueOfObj2w
          console.log('this in callback function: ', this); // { value: 'valueOfObj2', foo: [Function: foo] }
        }, 500);

        // 콜백함수를 익명함수로 정의할때 콜백함수의 this는 전역객체 window를 가리킨다.
        setTimeout(function () {
          console.log('case2: callbakc function is anonymous function');
          console.log('this value in callback fucntion: ', this.value); // undefined or window.value = 1000
          console.log('this in callback function: ', this); // node.js 환경 -> timeout { ... } 객체리턴 / 브라우저 환경 -> this에 window객체 바인딩
        }, 700);
      }
    };
    obj2.foo();
하지만 메소드 내에서 정의한 중첩 함수 또는 메소드에게 전달한 콜백 함수(보조 함수)의 this가 전역 객체를 바인딩하는 것은 문제가 있다. 중첩 함수 또는 콜백 함수(보조 함수)는 외부 함수를 돕는 헬퍼 함수로서 역할하므로 외부 함수의 일부 로직을 대신하는 경우가 대부분이다. 하지만 외부 함수인 메소드와 중첩 함수의 this가 일치하지 않는다는 것은 중첩 함수 또는 콜백 함수(보조 함수)를 헬퍼 함수로 동작하기 어렵게 만든다.<br><br>
때문에 메소드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메소드의 this 바인딩과 일치시키기 위한 방법은 아래와 같다.

    // var 키워드로 선언한 변수.
    var value = 'this value is global';
    const obj = {
      value: 'this value is obj object',
      foo() {
        const that = this; // foo 메서드의 this는 메서드를 foo메서드를 호출한 객체가된다. obj.foo();로 호출을 하였을시 obj 객체를 that에 할당.
        console.log(that === obj); // true
        function bar() {
          console.log(that.value); // that은 obj와 동치..
        }
        bar();
      }
    };
    obj.foo();
위 방법 이외에 this를 명시적으로 바인딩할수 있는 Function.prototype.apply / Function.prototyp.call / Function.prototype.bind 메서드가 존재한다.

    const obj = {
      value: 100,
      foo() {
        setTimeout(function () {
          console.log(this.value);
        }.bind(this), 500); // 100
      }
    };
    obj.foo();
### 2.2. 메소드 호출
> 메소드 내부의 this는 메소드를 호출한 객체, 즉 메소드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체에 바인딩된다.

    const cat = {
      name: 'naisu',
      getName() {
        return this.name;
      }
    };
    // getName함수를 부른 cat 객체가 this에 바인딩된다.
    console.log(cat.getName()); // naisu

    const dog = {
      name: 'chocola'
    };
    dog.getName = cat.getName; // cat의 getName프로퍼티를 dog객체의 getName프로퍼티에 동적할당.
    console.log(dog.getName()); // chocola
### 2.3. 생성자 함수 호출
> 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.
### 2.4. Function.prototype.apply/call/bind 메소드에 의한 간접 호출
> Function.prototype.apply, Function.prototype.call 메소드는 인수로 this와 인수 리스트를 전달받아 함수를 호출한다. apply와 call 메소드는 Function.prototype의 메소드이다. 즉, apply와 call 메소드는 Function 생성자 함수를 constructor 프로퍼티로 가리키는 모든 함수가 상속받아 사용할 수 있다.

    // 1. 객체의 생성자 연결에 call 사용

    // 공통되는 상품의 특징을 초기화하는 product 생성자함수...
    function Product(name, price) {
      this.name = name;
      this.price = price;

      if (price < 0) {
        console.log(`cannot create product ${this.name} width negative price`);
      }
    }
    // 개별 상품의 특징인 category만을 정의하고 call 함수로 product의 this에 바인딩하여 this를 초기화...
    function Food(name, price) {
      /* 
      Food의 this, name, price를 Product생성자 함수로 전달
      그리고 product생성자함수의 this가 리턴되어 Food생성자 함수에 바인딩..
       */
      Product.call(this, name, price); 
      this.category = 'food';
    }

    function Toy(name, price) {
      Product.call(this, name, price);
      this.category = 'Toy';
    }

    const robot = new Toy('GoldRun', 20000);
    const cheese = new Food('Cheddar', 10000);
    const a = Object.entries(cheese);
    const b = Object.entries(robot);
    console.log(a); // [ [ 'name', 'Cheddar' ], [ 'price', 10000 ], [ 'category', 'food' ] ]
    console.log(b); // [ [ 'name', 'GoldRun' ], [ 'price', 20000 ], [ 'category', 'Toy' ] ]

    // 2. 익명함수 호출

    /*
    배열을 정의하고 배열내의 모든 객체에 익명함수를 호출
    */
    const animals = [
      { species: 'Lion', name: 'King' },
      { species: 'Whale', name: 'Fail' }
    ];

    for (let i = 0; i < animals.length; i++) {
      (function (i) {
        this.print = function () {
          console.log(`#${i} ${this.species
          }: ${this.name}`);
        };
        this.print();
      }).call(animals[i], i);
    }

    // 3. 함수 및 this를 위한 문맥지정에 call사용
    function greet() {
      const reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
      console.log(reply);
    }
    const obj = {
      animal: 'greezlyBear',
      sleepDuration: '12 and 16 hours'
    };
    // this에 바인딩할 객체를 명시적으로 지정...
    greet.call(obj); // greezlyBear typically sleep between 12 and 16 hours

    // 4. 첫번째 인수 지정없이 함수호출에 call 사용
    // call 메서드에 인수를 지정하지 않으면 this의 값은 전역객체에 바인딩.
    globalThis.someVal = 100; // globalThis 키워드를 사용해서 전역객체에 등록

    function display() {
      console.log('aaa', this.someVal); // aaa 100
    }
    display.call();