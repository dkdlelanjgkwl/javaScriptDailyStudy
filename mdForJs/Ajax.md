# Ajax

## 1. Ajax란?

데이터를 교환(통신)하고 서버로부터 통신한 데이터를 기반으로 웹페이지를 동적으로 갱신하는 프로그래밍을 의미한다. Ajax는 Web API인 XMLHttpRequest 객체를 기반으로 동작한다. XMLHttpRequest는 서버와 브라우저 간의 비동기적(Asynchronous) 데이터 통신을 가능케하는 여러 메서드와 프로퍼티 메서드를 제공한다.

Ajax를 사용하기 이전의 웹페이지는 서버로부터 완전한 HTML을 전송받아 웹페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작했다. 따라서 화면에 변화가생기면 서버로부터 새로운 HTML을 전송받아 웹페이지 전체를 처음부터 다시 렌더링 하였다.

이러한 방식은 아래와 같은 단점이 있다.

1. 변경이 필요없는 부분까지 포함된 HTML을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생한다.

1. 변경이 필요없는 부분까지 처음부터 렌더링 되기때문에 화면전환이 일어나면 화면이 순간적으로 깜박이는 현상이 발생한다.
1. 클라이언트와 서버와의 통신이 동기방식으로 작동하기 때문에 서버로부터 응답이 있을때 까지 다음처리는 블로킹된다.

Ajax는 이전의 웹페이지 방식과 비교했을때 아래와 같은 장점이 있다.

1. 변경이 필요한 부분만을 갱신하기 위한 데이터만을 전송받기때문에 불필요한 데이터 통신이 발생하지 않는다.

1. 변경이 필요없는 부분은 다시 렌더링하지 않는다. 따라서 화면이 순간적으로 깜박이는 현상이 발생하지 않는다.
1. 클라이언트와 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후, 다른 처리를 계속해서 수행할 수 있다.

## 2. JSON

JSON(javaScript Object Notation)은 클라이언트와 서버 간의 통신을 위한 텍스트 데이터 포맷이다. 자바스크립트에 종속되지 않는 언어독립형 데이터 포맷으로 대부분의 프로그래밍 언어에서 사용할 수 있다.

### 2.1. JSON 표기방식

JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트이다.

```
{
  "name": "Lee",
  "age": 20,
  "alive": true,
  "hobby": ["traveling", "tennis"]
}
```

JSON의 키는 반드시 큰따옴표(작은따옴표 사용불가)로 묶어야 한다. 값은 객체 리터럴과 같은 표기법을 그대로 사용할 수 있다. 하지만 문자열은 반드시 큰따옴표로 묶어줘야한다.

### 2.2. JSON.stringfy

JSON.stringfy 메서드는 객체를 JSON 포맷의 문자열로 변환한다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화하여야 하는데
이를 직렬화(Serializing)이라 한다. 즉, 직렬화는 개체를 전송가능한 형태로 변형하는 것을 말한다.

JSON.stringify(value[, replacer[, space]])

- value

  JSON 문자열로 변환할 값

- replacer

  문자열화 동작방식을 변경하는 함수, 혹은 JSON 문자열에 포함될 값 객체의 속성들을 선택하기 위한 String과 Number 객체들의 배열. 이 값이 null이거나 제공되지 않으면, 객체의 모든 속성들이 JSON 문자열 결과에 포함된다.

  replacer가 함수일때는 문자열화될 key와 value, 2개의 매개변수를 받는다. key가 발견된 객체는 replacer의 this 매개변수로 제공된다.
  맨처음에는 문자열화될 그 객체를 나타내는 비어있는 key와 함께 호출되고, 그 다음에는 문자열화될 그 객체나 배열의 각 속성에 대해 호출된다. 함수일 경우 return 값은 문자열에 추가되어야하는 값을 반환 해야한다.(String, Boolean, Number) 만약 undefined를 반환하면 문자열의 결과에 포함되지 않는다.

* space

  가독성을 목적으로 JSON 문자열 출력에 공백을 삽입하는데 사용되는 String 또는 Number 객체. 이값이 만약 Number라면, 공백으로 사용되는 space의 수를 말한다. 이수가 10보다 크면 10으로 제한된다. 1보다 작은 값은 space가 사용되지 않는다는 것을 의미한다. 이것이 String 이라면, 그 문자열이 공백으로 사용된다. 이 매개변수가 제공되지 않는다면(또는 null이면), 공백이 사용되지 않는다.

```
const obj = {
  name: 'Lee',
  age: 20,
  alive: true,
  hobby: ['traveling', 'tennis']
};

// 객체 => JSON
const json = JSON.stringify(obj);
console.log(typeof json, json);
// string {"name":"Lee","age":20,"alive":true,"hobby":["traveling","tennis"]}

// 객체 => JSON 형식의 문자열 + prettify
const prettyJson = JSON.stringify(obj, null, 2);
console.log(typeof prettyJson, prettyJson);
/*
string {
  "name": "Lee",
  "age": 20,
  "alive": true,
  "hobby": [
    "traveling",
    "tennis"
  ]
}
*/

// replacer
// 값의 타입이 Number이면 필터링되어 반환되지 않는다.
function filter(key, value) {
  // undefined: 반환하지 않음
  return typeof value === 'number' ? undefined : value;
}

// 객체 => JSON 형식의 문자열 + replacer + prettify
const strFilteredObject = JSON.stringify(obj, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/*
string {
  "name": "Lee",
  "alive": true,
  "hobby": [
    "traveling",
    "tennis"
  ]
}
*/

const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

// 배열을 JSON 포맷문자열화
const jsonTodo = JSON.stringify(todos, null, 2);
console.log(typeof jsonTodo, jsonTodo);
/*
string [
  {
    "id": 1,
    "content": "HTML",
    "completed": false
  },
  {
    "id": 2,
    "content": "CSS",
    "completed": true
  },
  {
    "id": 3,
    "content": "Javascript",
    "completed": false
  }
]
*/

```

### 2.3. JSON.parse

JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환한다. 서버로부터 클라이언트로 전송된 JSON데이터는 문자열이다. 이문자열을 객체로써 사용하려면 JSON포맷의 문자열을 객체화 하여야하는데 이를 역직렬화(Deserializing)이라 한다. 즉, 역직렬화는 전송된 문자열 등을 다시 객체로 복원하는 것을 말한다.

```
const obj = {
  name: 'Lee',
  age: 20,
  alive: true,
  hobby: ['traveling', 'tennis'],
};
const json = JSON.stringify(obj);
console.log(typeof json, json);
// string {"name":"Lee","age":20,"alive":true,"hobby":["traveling","tennis"]}
const parsed = JSON.parse(json);
console.log(parsed === obj); // false
console.log(typeof parsed, parsed); // object {"name":"Lee","age":20,"alive":true,"hobby":["traveling","tennis"]}

const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false },
];

const jsonTodo = JSON.stringify(todos, null, 2);
console.log(typeof jsonTodo, jsonTodo);
const parsedTodo = JSON.parse(jsonTodo);
console.log(parsedTodo === jsonTodo); // false
console.log(typeof parsedTodo, parsedTodo);
/*
object [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
]
 */

```

## 3. XMLHttpRequest

브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본제공한다. 자바스크립트를 확인하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다. Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메소드와 프로퍼티를 제공한다.

### 3.1. XMLHttpRequest 객체 생성

XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성한다.

```
const xhr = new XMLHttpRequest();
```

XMLHttpRequest 객체는 다양한 프로퍼티와 메서드를 제공한다.
대표적인 프로퍼티와 메서드는 아래와 같다.

| 프로토타입 프로퍼티 | 설명                                                                                                                                                              |
| :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     readyState      | 요청의 현재 상태를 나타내는 정수. 아래의 XMLHttpRequest의 정적프로퍼티를 값으로 가진다.<br>UNSENT: 0<br>OPENED: 1<br>HEADERS_RECIEVED: 2<br>LOADING: 3<br>DONE: 4 |
|       status        | 요청에 대한 응답 상태(HTTP 상태 코드)를 나타내는 정수<br> ex) 200                                                                                                 |
|     statusText      | 요청에 대한 응답 메세지를 나타내는 문자열<br>ex) "OK"                                                                                                             |
|    responseType     | 응답타입<br>ex) document, json, text, blob, arraybuffer                                                                                                           |
|      response       | 요청에 대한 응답 몸체(response body). responseType에 따라 타입이 다르다.                                                                                          |

| 이벤트 핸들러 프로퍼티 | 설명                                               |
| :--------------------: | :------------------------------------------------- |
|   onreadystatechange   | readyState 프로퍼티 값이 변경된 경우               |
|      onloadstart       | 요청에 대한 응답을 받기 시작한 경우                |
|       onprogress       | 요청에 대한 응답을 받는 도중 주기적으로 발생       |
|        onabort         | abort 메서드에 의해 요청이 중단 되었을 경우        |
|        onerror         | 요청에 에러가 발생된 경우                          |
|         onload         | 요청이 성공적으로 완료된 경우                      |
|       ontimeout        | 요청 시간이 초과한 경우                            |
|       onloadend        | 요청이 완료한 경우, 요청이 성공 또는 실패하면 발생 |

|      메서드       | 설명                                       |
| :---------------: | :----------------------------------------- |
|       open        | HTTP 요청 초기화                           |
|       send        | HTTP 요청 전송                             |
|       abort       | 이미 전송된 HTTP 요청 중단                 |
| setRequestHeader  | HTTP 요청 헤더의 값을 설정                 |
| getResponseHeader | 지정한 HTTP 요청 헤더의 값을 문자열로 반환 |

|  정적 프로퍼티   | 값  | 설명                                  |
| :--------------: | :-: | :------------------------------------ |
|      UNSENT      |  0  | open 메서드 호출 이전                 |
|      OPENED      |  1  | open 메서드 호출 이후                 |
| HEADERS_RECIEVED |  2  | send 메서드 호출 이후                 |
|     LOADING      |  3  | 서버 응답 중(응답 데이터 미완성 사태) |
|       DONE       |  4  | 서버 응답 완료                        |

### 3.2. HTTP 요청 전송

### 3.3. HTTP 응답 처리
