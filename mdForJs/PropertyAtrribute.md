# 프로퍼티 어트리뷰트
## 1. 내부 슬롯과 내부 메소드
> 내부 슬롯(Internal slot)과 내부 메소드(Internal method)는 자바스크립트 엔진의 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(Pseudo property)와 의사 메소드(Pseudo method)이다. ECMAScript 사양에 등장하는 이중 대괄호([[…]])로 감싼 이름들이 내부 슬롯과 내부 메소드이다.

- 내부 슬롯과 내부 메소드는 ECMAScript 사양에 정의된 대로 구현되어 자바스크립트 엔진에서 실제로 동작하지만 **외부로 공개된 객체의 프로퍼티는 아니다.** 즉, 내부 슬롯과 내부 메소드는 자바스크립트 엔진의 내부 로직이므로 **원칙적으로 자바스크립트는 내부 슬롯과 내부 메소드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다.** 단, 일부 내부 슬롯과 내부 메소드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
> 프로퍼티의 상태란?<br>1. 프로퍼티의 값(value)<br>2. 값의 갱신가능 여부(writable)<br>3. 열거가능 여부(enumerable)<br> 4. 재정의 가능여부(configurable)

      const car = { price : 132042030, type : 'ferrari' };
      console.log(Object.getOwnPropertyDescriptor(car, 'type'));
      // { value : 'ferrari', writable : true, enumerable : true, configurable : true}
- Object.getOwnPropertyDescriptor메소드를 호출할때, 첫번째 매개변수는 객체의 참조를 전달하고 두번째 매개변수에 프로퍼티 키를 문자열로 전달한다.

- 이때 Object.getOwnPropertyDescriptor 메소드는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터(propertyDiscriptor)객체를 반환한다.
- 만약 존재하지않는 프로퍼티나 상속받은 프로퍼티에대한 디스크립터를 요구하면 undefined를 반환한다.
- object.getOwnProperyDescriptor메소드는 하나의의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만 ES8에서 도입된 Object.getOwnPropertyDescriptors 메소드는 모든 프로퍼티에대해 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.

      const car = { price : 12342323454 type: 'ferrari' };
      console.log(Object.getOwnPropertyDescriptors(car));
      //{
        price : { value : 12342323454, writable : true, enumerable : true, configurable : true },
        type : { value : 'ferrari', writable : true, enumerable : true, configurable : true }
      } 
## 3. 데이터 프로퍼티와 접근자 프로퍼티
### 3.1. 데이터 프로퍼티
> object.getOwnPropertyDescritor로 반환되는 value , enumerable, writable, configurable 등의 값.

디스크립터 객체의 프로퍼티 | 의미
:---:|:---:
| `value` | 프로퍼티에 접근하면 반환되는 값
| `writable` | 프로퍼티 값의 변경가능여부, false일경우 프로퍼티는 읽기전용이 된다.
| `enumerable` | false일경우 해당 프로퍼티는 for...in문이나 Object.keys 메소드로 열거할수 없다.
| `configurable` | false일 경우 프로퍼티의 삭제, 프로퍼티 어트리뷰트의 값의 변경이 불가능. 단 writable이 true인경우 value의 변경과 writable을 false로 변경하는것은 허용된다.
### 3.2. 접근자 프로퍼티
> 자체적으로 값을 가지지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할떄 사용하는 접근자 함수로 구성된 프로퍼티. <br> **일반 메서드와 구분을 해야하고, 또 메서드와 호출해서 사용하는 방법이 다른것도 정확히 알아두자.**

접근자 프로퍼티 어트리뷰트 | 설명
:---:|:---:
| `get` | 접근자 프로퍼티를 통해 데이터값을 읽을때 사용되는 함수. getter 함수를 실행하고 반환값을 프로퍼티값으로 돌려받는다.
| `set` | 접근자 프로퍼티를 통해 데이터프로퍼티의 값을 저장할때 사용되는 함수. 접근자 프로퍼티를 통해 함수를 호출하고 그결과가 프로퍼티값으로 저장된다.
| `enumerable` | 데이터프로퍼티와 동일
| `configurable` | 데이터프로퍼티와 동일

    const person = {
      firstName : 'james',
      lastName : 'lee',
      password : '1234',
      pwdChecked : false,
      set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
      },
      get fullName(){
        return `${this.firstName} ${this.lastName}`;
      },
      set pwdCheck(pwd){
        this.pwdChecked = (this.password === (pwd+'')) ? true : false; 
      },
      get pwdCheck(){
        return `${this.pwdChecked}`;
      }
    };
    console.log(person.firstName);
    console.log(person.fullName);
    person555.fullName = 'john wick';
    console.log(person.fullName);
    console.log(person.firstName);
    console.log(person.pwdCheck);
    person555.pwdCheck = 1234;
    console.log(person.pwdCheck);
    person555.pwdCheck = '2332';
    console.log(person.pwdCheck);
- 메소드 앞에 get / set이 붙어있으면 그 메소드는 getter 와 setter 함수가 되고 함수의 이름이 접근자 프로퍼티가 된다.<br> 접근자 프로퍼티는 자체적으로 값(value)를 가지지 않고 데이터프로퍼티의 값을 읽거나 저장할때 관여만 할수 있다.
### 3.3. 객체 내부에서 접근자 / 데이터타입 프로퍼티를 호출했을 시 실행순서
1. 프로퍼티키가 유효한지 확인한다.

1. 프로토타입 체인에서 프로퍼티를 검색.
1. 검색된 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다.
1. 접근자 프로퍼티일경우 프로퍼티 어트리 뷰트( [[get]] [[set]] )에 따라 getter 또는 setter 함수를 호출하여 그결과를 반환. 이때 반환되는 값은 propertyDescriptor 객체의 프로퍼티값과 같다.

- 접근자 프로퍼티와 데이터 프로퍼티의 구별 

      // 일반 객체의 __proto__는 접근자 프로퍼티이다.
      Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
      // {get: ƒ, set: ƒ, enumerable: false, configurable: true}

      // 함수 객체의 prototype은 데이터 프로퍼티이다.
      Object.getOwnPropertyDescriptor(function() {}, 'prototype');
      // {value: {…}, writable: true, enumerable: false, configurable: false}
## 4. 프로퍼티 정의
> 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존프로퍼티의 프로퍼티 어트리뷰트를 재정의하는것을 말한다.<br>이를 통해 객체의 프로퍼티가 어떻게 동작해야하는지를 명확히 정의할 수 있다.

- object.defineProperty 메소드로 프로퍼티 정의할 때 프로퍼티디스크립터 객체의 어트리뷰트를 생략할 시 기본값.

- objecet.definePropertise 메소드를 사용하여 여러개의 프로퍼티를 한꺼번에 정의할 수 있다.

프로퍼티 디스크립터 객체의 프로퍼티 | 디스크립터 객체의 프로퍼티 값 생략시 기본값
:---:|:---:|
| `value` | undefined |
| `get` | undefined |
| `set` | undefined |
| `writable` | false |
| `enumerable` | false |

    const fruit = {};
    Object.defineProperty(fruit, 'favoritSpecies',{
      value : [ 'apple', 'jamong', 'mango', 'strawBerry'],
      writable : true,
      enumerable : true, 
      configurable : true
    });

    Object.defineProperty(fruit, 'dislikeSpecies', {
      value : ['papaya', 'guajava']
    });

    let descriptor = Object.getOwnPropertyDescriptor(fruit, 'favoritSpecies');

    console.log(descriptor);

    descriptor = Object.getOwnPropertyDescriptor(fruit, 'dislikeSpecies');

    console.log(descriptor);

    // dislikeSpecies는 프로퍼티 값을 지정하지 않고 기본값으로 생성했으므로 enumerable = false이기 때문에 열거되지 않는다.

    console.log(Object.keys(fruit)); // 'favoritSpecies'
    
    // dislikeSpecies의 writable 값은 false이므로 현재 지정된 배열값외에 다른 값으로 바뀔수 없다.
    
    fruit.dislikeSpecies.push('banana'); // 배열 자체의 값에 객체의 디스크립터설정은 먹히지않는다.
    fruit.dislikeSpecies = ['banana'];
    fruit.dislikeSpecies = 'hello';

    // 하지만 키값인 배열자체값을 다른배열로 바꾸려하면 바꿀수없다.
    console.log(fruit.dislikeSpecies);

    // configurable 값이 false인경우 삭제를 할수 없고 해당프로퍼티 재정의도 불가능하다.

    delete fruit.dislikeSpecies; // 삭제불가, 에러는 발생되지않고 무시된다.

    // Object.defineProperty(fruit, dislikeSpecies, {enumerable : true}); // Cannot redefine Property : dislikeSpecies

    Object.defineProperty(fruit, 'addFavorit', {
      get() {
        res = '';
        for(let i = 0; i < this.favoritSpecies.length; i++){
          res += this.favoritSpecies[i]
          if(!(i===this.favoritSpecies.length)){
            res += '\n';
          }
        }
        return res;
      },
      set(str) {
        let items = str.split(' ');
        for(let i = 0; i < items.length; i++){
          if(this.favoritSpecies.indexOf(items[i]) === -1) 
            this.favoritSpecies.push(items[i])
        }
      },
      enumerable : true,
      configurable : true
    });

    console.log(fruit.addFavorit);
    fruit.addFavorit = 'jamong';
    fruit.addFavorit = 'pineApple Aloe';
    console.log(fruit.addFavorit);

    descriptor = Object.getOwnPropertyDescriptor(fruit, 'addFavorit');

    console.log(descriptor);
    // {  get: [Function: get], set: [Function: set], enumerable: true, configurable: true }
## 5. 객체변경 방지
> 객체는 변경 가능한 값이므로 재할당없이 직접 변경이 가능하다. 즉, 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티의 값을 갱신할 수 있으며 Object.defineProperty 또는 Object.defineProperties 메소드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다.<br>
자바스크립트는 객체의 변경을 방지할 수 있는 다양한 메소드를 제공한다. 객체 변경 방지 메소드 들은 객체의 변경을 금지하는 강도가 다르다.
### 5.1. 객체확장금지 (Object.preventExtensions)
> 확장이 금지된 객체는 **프로퍼티 추가가 금지** <br> 프로퍼티는 프로퍼티 동적추가와 object.defineProperty메소드 방식 두가지 모두 금지된다.<br>
**확장이 금지된 객체인지 여부는 object.isExtensible 메소드로 확인할 수 있다.**

구분 | 메소드 | 프로퍼티추가 | 프로퍼티삭제 | 프로퍼티값 읽기 | 프로퍼티값 쓰기 | 프로퍼티 어트리뷰트 재정의
:---:|:---:|:---:|:---:|:---:|:---:|:---:
| 객체확장금지 | `Object.preventExtensions` |x|o|o|o|o|

    Object.preventExtensions(target); // 객체 확장금지.

    console.log(Object.isExtensible(target)); // false
     
    console.log(Object.getOwnPropertyDescriptors(target)); 
    // writable : true, enumerable : true, configurable : true
### 5.2. 객체 밀봉 (Object.seal)
> 객체 밀봉이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미한다. **즉, 밀봉된 객체는 읽기와 쓰기만 가능**<br>
**밀봉된 객체인지 여부는 Object.isSealed 메소드로 확인가능하다.**

구분 | 메소드 | 프로퍼티추가 | 프로퍼티삭제 | 프로퍼티값 읽기 | 프로퍼티값 쓰기 | 프로퍼티 어트리뷰트 재정의
:---:|:---:|:---:|:---:|:---:|:---:|:---:
| 객체 밀봉 | `Object.seal` |x|x|o|o|x|
    Object.seal(target); // 객체 밀봉

    console.log(Object.isSealed(target)); // true

    console.log(Object.getOwnPropertyDescriptors(target));
    // writable : true, enumerable : true, configurable : false
### 5.3. 객체 동결 (Object.freeze)
> 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티값 갱신 금지를 의미한다. 즉, **동결된 객체는 읽기만 가능하다.**<br>
**밀봉된 객체인지 여부는 Object.isFrozen 메소드로 확인가능하다.**

구분 | 메소드 | 프로퍼티추가 | 프로퍼티삭제 | 프로퍼티값 읽기 | 프로퍼티값 쓰기 | 프로퍼티 어트리뷰트 재정의
:---:|:---:|:---:|:---:|:---:|:---:|:---:
| 객체 동결 | `Object.freeze` |x|x|o|x|x|
    Object.freeze(target); // 객체 동결
    
    Object.isFrozen(target); // true

    console.log(Object.getOwnPropertyDescriptors(target));
    // writable : false, enumerable : true, configurable : false
### 5.4. 불변 객체
> 지금까지 살펴본 변경방지 메소드들은 얕은 변경방지(Shallow only)로 **직속 프로퍼티만 변경이 방지되고 중첩객체까지는 영향을 주지는 못한다.**<br>
객체의 중첩객체까지 동결하여 변경 불가능한 읽기 전용의 불변객체를 구현하려면 객체를 값으로 가지는 **모든 프로퍼티에 대하여 재귀적으로 Object.freeze메소드를 호출**해야한다.

    function deepFreeze(target){
      // 객체가 아니거나, 이미 동결상태인 객체는 무시하고, 동결되지 않은 객체만 동결한다.
      if(target && typeof target === object && !Object.isFrozen(target)){
        Object.freeze(target);
        Object.keys(target).forEach(key => deepFreeze(target[key]))
      }
      return target;
    }

1. object.keys 메소드로 객체 자신의 열거가능한 key들을 배열로 반환받는다.

1. forEach 메소드로 배열을 순회하며 배열의 각요소에 대하여 콜백함수를 실행한다.