# **1. 객체**
> 자바스크립트의 객체는 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합이다.<br>
원시 값을 제외한 나머지 값(함수, 배열, 정규표현식) 변경 가능한 값 (mutable value)이다.

## 1.1. 프로퍼티
> 객체는 프로퍼티(Property)들의 집합이며 프로퍼티는 키(key)과 값(value)으로 구성된다. 프로퍼티를 나열할 때는 쉼표(,)로 구분한다. 일반적으로 마지막 프로퍼티 뒤에는 쉼표를 사용하지 않으나 사용해도 좋다.
 - 이미 존재하는 프로퍼티 키를 중복해서 선언하고 나중에 선언한 값으로 덮어 쓸 수 있다.
 - 프로퍼티 키에 문자열 이나 symbol 값 이외의 값을 선언 하면 암묵적타입 변환으로 문자열로 취급한다.
 - 빈 문자열('')은 프로퍼티 키로 생성가능하지만 권장하는 방향은 아니다.
 - 프로퍼티키의 동적생성 가능
        
        // ES5 Ver
        var animal = {};
        var key = 'bigCat';
        animal[key] = 'Reopard';

        // ES6 Ver
        var key = 'bigCat';
        var animal = { [key] : 'Lynx' };
        console.log(animal);
 - 프로퍼티키는 식별자 네이밍 규칙을 따른다.(ex. firstName) 따르지 않을 경우에는 반드시 ''(따옴표)로 감싸줘야한다.

 ## 1.1.1 메소드
 > 프로퍼티값으로 함수를 가지는것.<br> 일반함수와 구분하기 위해 메소드라고 부른다.
        
        var doSomething = {
            initNum = 0,
            increase: function(){
                return ++this.initNum;
            }
        };
        console.log(doSomething.increase());
## 1.1.2. 프로퍼티 접근
> 프로퍼티 값에 접근하려면 마침표(.)를 사용하는 마침표 표기법(Dot notation) 또는 대괄호([…])를 사용하는 대괄호 표기법(Bracket notation)을 사용한다.<br>
프로퍼티 키가 식별자 네이밍 규칙을 따르는 이름, 즉 자바스크립트에서 사용 가능한 유효한 이름이면 마침표 표기법과 대괄호 표기법을 모두 사용할 수 있다.

        var object = {
            key1 : 'one of key1 value'
        }
        console.log(object.key1); // 마침표 표기법
        console.log(object['key1']); // 대괄호 표기법
- 대괄호 표기법에서 주의할점<br><br>1. 대괄호 내부에 지정하는 키는 반드시 따옴표로 감싼 문자열이어야 한다.
<br><br>2. 감싸지 않고 객체에 접근할시에 대괄호 내부에 값은 식별자로 판단되어 undefined를 반환한다.(엄밀히 따지면 reference Error이다.)

## 1.1.3. 프로퍼티 값 갱신
> 이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티는 나중에 할당한 값으로 갱신된다.

## 1.1.4. 프로퍼티 동적생성
> 존재하지않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 값이 할당된다.

        var object = {};
        object.prop1 = '새로 추가되는 값';
        console.log(object.prop1); 
        // prop1 이라는 키와 '새로 추가되는 값'이 동적으로 할당된다.

## 1.1.5. 프로퍼티 삭제
> delete 연산자는 객체의 프로퍼티를 삭제한다. 이때 delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 한다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러없이 무시된다.

        var object = {
            fruit : '사과'
        }
        delete object.fruit;

## 1.1.6 프로퍼티 축약표현(ES6)

        // ES6
        let x = 1;
        let y = 0;
        const object = { x, y }; // 축약표현
        // {x:1, y:0} <= ES5

## 1.1.7 프로퍼티키 동적생성
> 문자열 또는 문자열로 변환 가능한 값을 반환하는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 있다. 단, 프로퍼티 키로 사용할 표현식을 대괄호([…])로 묶어야 한다. 이를 계산된 프로퍼티 이름(Computed property name)이라 한다.

        // ES5
        var prefix = 'prop';
        var i = 0;

        var obj = {};

        // 프로퍼티 키 동적 생성
        obj[prefix + '-' + ++i] = i;
        obj[prefix + '-' + ++i] = i;
        obj[prefix + '-' + ++i] = i;

        console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

        // ES6
        const prefix = 'prop';
        let i = 0;

        // 객체 리터럴 내부에서 프로퍼티 키 동적 생성
        var obj = {
            [`${prefix}-${++i}`]: i,
            [`${prefix}-${++i}`]: i,
            [`${prefix}-${++i}`]: i
        };

        console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
## 1.1.8 프로퍼티 메소드 축약표현
> ES6의 메소드 축약 표현으로 정의한 메소드는 프로퍼티에 할당한 함수와 다르게 동작한다.

        // ES6
        const obj = {
            firstName: 'Lee',
            lastName: 'guen',
        // 메소드 축약 표현
            fullName() {
                console.log(`${obj.firstName} ${obj.lastName}`);
            }
        };

        obj.fullName(); // Lee guen