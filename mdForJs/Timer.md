# 타이머

함수를 명시적으로 호출하면 함수가 즉시 실행된다. 만약 함수를 명시적으로 호출하지 않고 일정시간이 경과된 이후에 호출되도록 함수호출을 예약하려면 타이머 함수를 사용한다. 이를 호출 스케쥴링(scheduling a call)이라 한다.

자바스크립트는 생성할 수 있는 setTimeout/ setInterval과 타이머를 제거할 수 있는 타이머 함수 clearTimeout / clearInterval을 제공한다. 이 타이머 함수들은 모두 window의 메서드이다.

자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖기 때문에 동시에 두가지 이상의 태스크를 동시에 실행할 수 없다. 즉, 자바스크립트 엔진은 싱글 스레드(Single thread)로 동작한다. 이런 이유로 타이머 함수 setTimeOut과 setInterval는 비동기적(asynchronous)으로 동작한다.

## 1. setTimeout / clearTimeout

setTimeout 함수는 두번째 인수로 전달한 시간(ms, 1/1000초)이 경과한 이후에 첫번째 인수로 전달한 콜백함수를 단 한번 호출한다.

```
const timeoutId = setTimeout(func[, delay, param1, param2, ...])
```

|      매개변수       |                                                                                                                                             설명                                                                                                                                             |
| :-----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|        func         |                                         타이머가 완료된 이후 호출할 콜백함수를 전달<br>\* 콜백 함수 대신 코드를 문자열로 전달할 수 있다. 이때 코드 문자열은 타이머가 만료된 뒤 해석되고 실행된다. 이는 흡사 eval 함수와 유사하며 권장하지는 않는다.                                          |
|        delay        | 함수를 호출하기까지 지연할 시간을 밀리초(ms) 단위로 전달한다. 인수전달을 생략한 경우, 기본값이 0으로 지정된다.<br>_ delay에 전달한 지연 시간이 정확히 보장되지는 않는다. 이벤트 큐에 콜백 함수를 등록하는 시간을 지연할 뿐이다.<br>_ delay가 4ms 이하인 경우, 최소 지연 시간 4ms가 지정된다. |
| param1, param2, ... |                                                                                             호출 스케쥴링된 콜백함수에 전달하여야 할 인수가 존재하는 경우, 세번째 이후의 인수로 전달할 수 있다.                                                                                              |

```
// 1초의 시간이 흐른뒤 첫번째 인자로 받은 화살표함수를 실행한다.
setTimeout(() => console.log('Hi'), 1000);

// 1초의 시간이 흐른뒤 1번째 매개변수로 받은 화살표함수를 실행하면서 3번재 인자로 받은 인수를 전달하면서 호출.
setTimeout(name => console.log(`${name}`), 500, 'Lee');

// 지연 시간을 생략하면 기본값 0이 지정된다.
setTimeout(() => console.log('Hello'));
```

setTimeout 함수는 일정시간이 경과한 이후 전달받은 콜백함수를 호출하는 타이머를 생성하고 생성된 타이머를 식별할 수 있는 고유한 타이머 id값을 반환한다. setTimeout 함수가 반환한 id값은 브라우저 환경인 경우 숫자이며, Node.js 환경인 경우 객체이다.

setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소할 수 있다. setTimeout 함수가 생성된 타이머를 취소하면 콜백함수 호출 예약이 취소된다.

```
const timeoutId = setTimeout(() => console.log('Hi'), 1000);
clearTimeout(timeoutId);
```

## 2. setInterval / clearInterval

setInterval 함수는 두번째 인자로 전달한 시간이 경과할 때 마다 첫번째 인수로 전달한 콜백함수를 타이머가 취소될 때까지 호출한다.

```
const timerId = setInterval(func|code[, delay, param1, param2, ...]);
```

setInterval 함수는 일정 시간이 경과할 때 마다 전달받은 콜백함수를 호출하는 타이머를 생성하고, 생성된 타이머를 식별할 수 있는 고유한 타이머 id값을 반환한다. setInterval 함수가 반환하는 타이머 id 값은 브라우저 환경인 경우, 숫자이며 Node.js 환경인 경우, 객체이다.

setInterval 함수가 반환한 타이머 id를 clearInterval 함수의 인수로 전달하여 타이머를 취소할 수 있다. setInterval 함수가 생성한 타이머를 취소하면 콜백 함수 호출 예약이 취소된다.

```
let count = 1;
const timeoutId = setInterval(() => {
  // 1초마다 log 실행
  console.log(count); // 1 2 3 4 5

  // count를 증가시키다가 count = 5가 되면 타이머함수의 콜백함수 등록이 해지된다.
  if(count++ === 5) clearInterval(timeoutId);
}, 1000);
```
