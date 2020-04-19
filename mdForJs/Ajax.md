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

브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본제공한다. 자바스크립트를 확인하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다. Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메소드와 프로퍼티를 제공한다. **이 주제의 하위 목록은 html form으로 데이터를 전송하는 것이 아니라 javaScript로 데이터를 전송하는 것을 가정한다는 것을 주의 하도록하자.**

만약 HTML의 form요소로 요청을 보내는 경우 HTML 폼 전송으로 일어나는 POST 요청 내에서, 요청의 Content-Type은 form 요소 상의 enctype 속성에 의해 지정된다.

아래는 form 요소를 통해 요청을 보내는 예시이다.

```
<form action="/" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="some text">
  <input type="file" name="myFile">
  <button type="submit">Submit</button>
</form>

```

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

| 프로토타입 메서드 | 설명                                       |
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

HTTP 요청을 전송하는 경우, 아래의 순서를 따른다.

1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청 초기화

1. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 HTTP 요청의 헤더 값 설정

1. XMLHttpRequest.prototype.send 메서드로 HTTP 요청 전송

```javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', '/users');

// HTTP 요청헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
```

`XMLHttpRequest.prototype.open`

open 메서드는 서버에게 전송할 HTTP 요청을 초기화 한다. open 메서드의 호출방법은 아래와 같다.

```
xhr.open(method, url[, async])
```

| 매개변수 | 설명                                                                  |
| :------: | :-------------------------------------------------------------------- |
|  method  | HTTP 요청메서드("GET", "POST", "PUT", "DELETE"등);                    |
|   url    | HTTP 요청을 전송할 URL                                                |
|  async   | 비동기 요청 여부. 옵션으로 기본값은 true이며 비동기방식으로 동작한다. |

HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)을 알리는 방법이다. 주로 5가지의 요청 메서드를 사용하여 CRUD를 구현한다.

| HTTP 요청 메서드 |      종류      |         목적          | 페이로드 |
| :--------------: | :------------: | :-------------------: | :------: |
|       GET        | index/retrieve | 모든/특정 리소스 취득 |    x     |
|       POST       |     create     |      리소스 생성      |    O     |
|       PUT        |    replace     |  리소스 전체의 교체   |    O     |
|      PATCH       |     modify     |   리소스 일부 수정    |    O     |
|      DELETE      |     delete     | 모든/특정 리소스 삭제 |    x     |

`XMLHttpRequest.prototype.send`

send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송한다. 기본적으로 서버에 전송하는 데이터는 GET,POST 요청에 따라 그 요청방식에 차이가있다.

- GET 요청 메서드의 경우, 데이터를 URL의 일부분인 쿼리 문자열(qeury string)로 서버로 전송한다.

- POST 요청 메서드의 경우, 데이터(페이로드)를 요청몸체(request body)에 담아 전송한다.

send 메서드에는 요청 몸체(request body)에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다. 페이로드가 객체인경우, 반드시 JSON.stringify 메서드를 사용하여 직렬화 한다음 전달해야 한다.(Ajax 통신을 가정)

```javascript
xhr.send(
  JSON.stringify([
    { id: 1, content: 'HTML', complete: false },
    { id: 2, content: 'CSS', complete: true },
    { id: 3, content: 'JavaScript', complete: false },
  ])
);
```

만약 HTTP 요청 메서드가 GET인 경우, send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 표시된다.

POST 요청을 HTML 양식 외의 다른 방법(XMLHttpRequest 등)으로 전송할 땐 요청의 본문이 어떤 형태도 취할 수 있다.

예를 들어 POST로 요청을 보내면서 application/x-www-form-urlencoded방식으로 (&으로 분리되고, "=" 기호로 값과 키를 연결하는 key-value tuple로 인코딩되는 값)을 보낼 수 있다.

참고: <https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST>

`XMLHttpRequest.prototype.setRequestHeader`

setRequestHeader 메서드는 HTTP 요청의 헤더 값을 설정한다. setRequestHeader 메서드는 반드시 open 메서드 이후에 호출해야 한다.
자주 사용하는 요청 헤더인 Content-type과 Accept에 대해 알아보자.

Content-type은 요청 몸체(request body)에 담아 전송할 데이터의 MIME-type의 정보를 표현한다. Content-Type 개체 헤더는 리소스의 media type을 나타내기 위해 사용된다. 응답/요청 내에서 Content-type은 어떤 유형의 데이터가 반환/전송 하는지 알려준다.

자주 사용되는 MIME-type은 아래와 같다.

| MIME-type  | 서브타입                                                                     |
| :--------: | :--------------------------------------------------------------------------- |
|    text    | text/pain, text/html, text/css, text/javascript                              |
| aplication | aplication/json, application/x-www-form-urlencoded, application/octet-stream |
| multipart  | multipart/form-data                                                          |

특정 서브타입이 없는 텍스트 문서들에 대해서는 text/plain이 사용되어야 한다. 특정 혹은 알려진 서브타입이 없는 이진 문서에 대해서는 유사하게, application/octet-stream이 사용되어야한다.

application/otet-stream인 서브타입 data는 실제로 잘 알려지지 않은 이진 파일을 의미하므로, 대부분의 브라우저들은 이런 포괄적인 MIME 타입에 대한 ("워드에서 열기"와 같은) 기본적인 동작의 정의를 허용하지 않는다.(되도록이면 맞는 서브타입을 기입하도록 노력하도록 한다.)

application/x-www-form-urlencoded는 HTTP 요청 메서드가 POST인 경우, 서버로 data를 보낼때 &로 분리되고 "="기호로 키와 값을 연결하는 key-value tuple로 인코딩되는 값이다. 영어 알파벳이 아닌 문자들은 percent encoded로 인코딩된다. (ex -> say=Hi&to=Mom) 이러한 값을 서버측에 application/x-www-form-urlencoded 타입의 데이터가 전송됬을음 알릴때 사용한다. 하지만 form 요소로 요청을 할때 대부분의 브라우저는 알아서 해당 Content-type(application/x-www-form-urlencoded)에 대해 자동으로 encoding 하도록 구현 해두었을 것이다. 따라서 우리는 application/x-www-form-urlencoded인 Content-type을 사용할 경우 body 인코딩이 해당 framework 혹은 library에서 자동으로 되는지 확인한 후 안될경우에 해주는것이 정확한 사용법이라 할 수 있다. form data로 전송을 하는 경우가 아닐경우(개발자가 직접 request를 javaScript로 구현하는 경우) 이 타입을 기입해줘야 한다.

한가지 예로 node.js의 request 라이브러리는 해당 Content-Type에 대해 qs.stringify로 url인코딩하도록 이미 내부에 구현이 되어있다.

```node.js
Request.prototype.form = function (form) {
  if (form) {
    this.setHeader(
      'content-type',
      'application/x-www-form-urlencoded; charset=utf-8'
    );
    this.body = qs.stringify(form).toString('utf8');
    return this;
  }
  // create form-data object
  this._form = new FormData();
  return this._form;
};
```

multipart/form-data는 파일 첨부를 위해 사용하는 Content-type이다.

Accept 요청 HTTP 헤더는 MIME 타입으로 표현되는, 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지 알려준다. 이것을 통해 컨텐츠 협상을 하여 서버는 제안중 하나를 선택하고 사용하며 Content-type 응답 헤더로 클라이언트에게 선택된 타입을 알려준다.
directive로 아래와 같은 값을 가진다.

- `<MIME_type>/<MIME_subtype>`

  text/html과 같이 명시적인 MIME_type

- `<MIME_type>/*`

  서브 타입을 갖지 않는 마임타입  
  예를 들어 `image/*`은 image/png, image/svg, image/gif등 다른 어떠한 image타입이 될 수 있다.

- `*/*`

  모든 MIME-type

아래는 요청 몸체에 담아 서버로 전송할 페이로드의 MIME-type을 지정하는 예제이다.

```javascript
const xhr = new XMLHttpRequest();

xhr.open('POST', '/users');

xhr.setRequestHeader('content-type', 'application/json');

xhr.send(
  JSON.stringify([
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false },
  ])
);
```

HTTP 클라이언트가 서버에 요청할 때 서버가 센드백할 데이터의 MIME-type을 Accept로 지정할 수 있다. 아래는 서버가 센드백할 데이터의 MIME-type을 지정하는 예이다.

```javascript
xhr.setRequestHeader('accept', 'application/json');
```

만약 Accept 헤더를 설정하지 않으면, send 메서드가 호출될때 Accept 헤더가 `*/*`으로 전송된다.

옳바른 MIME-type구성해야하는 이유: <https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Configuring_server_MIME_types>

알아둬야 할 MIME-type종류: <https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types>

### 3.3. HTTP 응답 처리

서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다. XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티인 readyState 프로퍼티 값이 변경된 경우, 발생하는 readystatechange 이벤트를 캐치하여 아래와 같이 HTTP 응답을 처리할 수 있다.

```html
<!DOCTYPE html>
<html lang="ko-kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      const xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

      xhr.send();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.response));
        } else {
          console.error('Error', xhr.status, xhr.statusText);
        }
      };
      console.log(xhr);
    </script>
  </body>
</html>
```

send 메서드를 통해 서버에 HTTP 요청을 전송하면 서버는 응답을 반환한다. 하지만 언제 응답이 클라이언트에 도달할 지는 알 수 없다. 따라서 readystatechange 이벤트를 통해 HTTP 현재 요청상태를 확인 해야한다. readystatechange 이벤트는 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될때 마다 발생한다.

onreadystatechange 이벤트 핸들러 프로퍼티에 할당한 이벤트 핸들러는 xhr.readyState가 XMLHttpRequest.DONE인지 확인하여 서버의 응답이 완료되었는지 확인한다.

서버의 응답이 완료되었다면 요청에 대한 응답상태(HTTP 상태 코드)를 나타내는 xhr.status가 200인지 확인하여 정상처리와 예외 처리를 구분한다. 정상적으로 응답에 요청이 도착하였다면 요청에대한 응답 몸체(response body)를 나타내는 xhr.response에서 서버가 전송한 데이터를 취득한다.

readystatechange 이벤트 대신 load 이벤트를 캐치해도 좋다. load 이벤트는 요청이 성공적으로 완료된 경우 발생한다. 따라서 load 이벤트를 캐치하는 경우, xhr.readyState가 XMLHttpRequest.DONE인지 확인할 필요가 없다.

```html
<!DOCTYPE html>
<html lang="ko-kr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // XMLHttpRequest 객체 생성
      const xhr = new XMLHttpRequest();

      // HTTP 요청 초기화
      xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

      // HTTP 요청 전송
      xhr.send();

      // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
      xhr.onload = () => {
        // status는 response 상태 코드를 반환 : 200 => 정상 응답
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.response));
          console.log('1');
          // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
        } else {
          console.error('Error', xhr.status, xhr.statusText);
        }
      };
      console.log(xhr);
    </script>
  </body>
</html>
```
