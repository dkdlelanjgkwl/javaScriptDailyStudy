# 클로저
## 1. 렉시컬 스코프
## 2. 함수 객체의 내부슬롯[[Environment]]
## 3. 클로저와 렉시컬 환경
## 4. 클로저의 활용
    <!DOCTYPE html>
    <html lang="ko-kr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Closure Example</title>
    </head>
    <body>
      <button class="increase">+</button>
      <span class="counter">0</span>
      <button class="decrease">-</button>
      <script>
        const $counter = document.querySelector('.counter');
        const ButtonModule = (function () {
          let num = 0;
          function Counter() {}
          Counter.prototype.increase = function () { $counter.textContent = ++num; };
          Counter.prototype.decrease = function () { if (num <= 0) return; $counter.textContent = --num; };
          return Counter;
        }());
        const buttonModule = new ButtonModule();
        document.querySelector('.increase').onclick = buttonModule.increase;
        document.querySelector('.decrease').onclick = buttonModule.decrease;
      </script>
    </body>
    </html>

    /*
    생성자함수가 즉시실행함수안에서 globalthis 같은 역할을 하고,
    생성자함수의 프로토 타입에 공통으로 사용할 메서드정의후..
    생성자함수 리턴을 하게되면 공통적인 렉시컬환경(이코드 내에선 innerFlex)을 가지고 연동해서 사용가능하다.
    */
    const statController = (function () {
      let innerFlex = 100;
      function ParentM() {}
      ParentM.prototype.increase = function () { console.log(++innerFlex)};
      ParentM.prototype.decrease = function () { console.log(--innerFlex)};
      return ParentM;
    }());

    let stat = new statController();
    console.log(stat.innerFlex);
    stat.innerFlex = 1;
    console.log(stat.innerFlex);
    stat.increase();
    stat.increase();
    stat.increase();
    stat.increase();
    stat.decrease();
    console.log(stat.innerFlex);
    console.log('-----');
    let stat2 = new statController();
    stat2.decrease();
    stat2.decrease();
    stat2.decrease();
    stat2.decrease();
    stat2.decrease();
    stat2.decrease();

    /*
    객체를 리턴하면서 클로저를 만든다. 생성자함수를 리턴하는 방법과
    객체리터럴에 메서드를 넣어서 리턴하는 경우 즉시 실행함수로 함수를 실행하지않고 익명함수로 정의만 한다.
    함수의 렉시컬 환경을 만들기 위해서 선언된 outer함수(여기선 globalLexical함수)로 객체를 만들때 마다 새로운 렉시컬 환경이 형성된다. 따라서 생성자 함수를 리턴하는 경우와 객체를 리턴하는 경우는 다르다는 것을 숙지하도록 하자.
    */
    const globalLexical = function () {
      let lexical = 0;
      function changeVal(value) {
        lexical += value;
        // console.log(lexical);
      }
      return {
        increase () { changeVal(1) },
        decrease () { changeVal(-1) },
        getVal () { console.log(lexical); }
      };
    }
    const counter1 = globalLexical();
    counter1.increase();
    counter1.increase();
    counter1.increase();
    counter1.increase();
    counter1.increase();
    counter1.getVal();

    counter1.decrease();
    counter1.decrease();
    counter1.decrease();
    counter1.decrease();
    counter1.getVal();

    // counter1 객체와 다른 새로운 렉시컬 환경을 생성
    const counter2 = globalLexical();
    counter2.increase();
    counter2.increase();
    counter2.increase();
    counter2.getVal();

    counter2.decrease();
    counter2.decrease();
    counter2.decrease();
    counter2.decrease();
    counter2.decrease();
    counter2.getVal();

    /*
    고차함수에서 함수바깥쪽 helper 함수와 연동해서 사용하기.
    고차함수에서 return으로 function함수를 실행하면서 인자로 받은
    helper 함수를 렉시컬환경에서 매개변수를 검색하게 만들고 
    helper 함수가 고차함수의 렉시컬환경을 이용해 helper가 동작 
    할 수 있다. 이방법도 객체를 리턴하는 방식과 똑같이 고차함수를 실
    행하면서 변수에 할당되므로 각각의 독립적인 렉시컬환경을 만들기
    때문에 주의하도록 하자.
    */
    function outer(func) {
      let num = 0;
      // return 문으로 클로저 생성.
      return function () {
        num = func(num);
        return num;
      };
    }

    function increase(n) {
      return ++n;
    }

    const incre = outer(increase);
    console.log(incre());
    console.log(incre());
    console.log(incre());
    console.log(incre());
    console.log(incre());
## 5. 자주 발생되는 실수