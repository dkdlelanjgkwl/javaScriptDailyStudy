# 이벤트
## 1. 이벤트 드리븐 프로그래밍이란?
브라우저는 처리해야 할 특정사건이 발생하면 이를 감지하여 이벤트(event)를 발생(trigger)시킨다. 예를 들어 클릭, 키보드, 마우스 입력, 마우스 이동 등이 발생하면 브라우저는 이를 감지하여 특징타입의 이벤트를 발생시킨다.

만약 애플리케이션 특정타입의 이벤트에 대해 반응하여 어떤 일을 하고 싶다면 해당하는 타입의 이벤트가 발생했을때 호출될 함수를 브라우저에게 알려 호출을 위임한다. 이때 이벤트가 발생했을때 호출 될 함수를 이벤트 핸들러라 하고, 이벤트가 발생했을때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라고 한다.

예를 들어 사용자가 버튼을 클릭하면 어떤 함수를 호출하고 싶다고 가정해 보자. 이때 문제는 "언제 함수를 호출해야 하는가"이다. 사용자가 언제 버튼을 클릭할지 알수 없으므로 언제함수를 호출해야 할지 알 수 없기 때문이다.

다행히 브라우저는 사용자의 버튼 클릭을 감지하여 클릭이벤트를 발생시킬수 있다. 그리고 특정 버튼 요소에서 클릭이벤트가 발생하면 특정 함수(이벤트 핸들러)를 호출하도록 브라우저에게 위임(이벤트 핸들러 등록)할 수 있다. 즉, 함수를 언제 호출 할지 알수 없으므로 개발자가 명시적으로 함수를 호출하는 것이 아니라 브라우저에게 함수호출을 위임하는 것 이다. 이를 코드로 표현하면 아래와 같다.
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button>Click Me</button>
  <script>
    const $button = document.querySelector('button');

    // 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
    $button.onclick = function() {
      console.log('button click');
    };
  </script>
</body>
</html>
```
위 예제를 보면 버튼 요소 $button의 onclick 프로퍼티에 함수를 할당하였다. Window, Document, HTMLElement 타입의 객체는 onclick과 같이 이벤트 대응하는 다양한 이벤트 핸들러 프로퍼티를 가지고 있다. 이 이벤트 핸들러 프로퍼티에 함수를 할당하면 해당 이벤트가 발생했을때 할당함 함수가 브라우저에 의해서 호출된다.

이처럼 이벤트와 그에 대응하는 함수를 통해 사용자와 애플리케이션은 상호작용(interaction)이 가능하게 된다. 이와 같이 **프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 이벤트 드리븐 프로그래밍(event-driven programming)**이라 한다.

## 2. 이벤트 타입
### 2.1. 마우스 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
click | 마우스 버튼을 클릭했을때
dbclick | 마우스 버튼을 더블 클릭 했을때
mousedown | 마우스 버튼을 눌렀을 때
mouseup | 누르고 있던 마우스 버튼을 놓았을때
mousemove | 마우스를 움직였을 때
mousenter | 마우스를 요소안으로 이동했을때
mouseleave | 마우스를 요소밖으로 이동했을때
### 2.2. 키보드 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
keydown | 모든키를 눌렀을때 발생한다.<br>* control, option, shift, tab, delete, 방향 키와 문자, 숫자, 특수 문자 키를 눌렀을 때 발생한다. 단, 문자, 숫자, 특수 문자 키를 눌렀을 때는 연속적으로 발생하지만 그 외의 키를 눌렸을 때는 한번만 발생한다.
keypress | 문자키를 눌렀을때 연속적으로 발생한다.<br>* control, option, shift, tab, delete, 방향 키 등을 눌렸을 때는 발생하지 않고 문자, 숫자, 특수 문자 키를 눌렸을 때만 발생한다.
keyup | 누르고 있던 키를 놓았을때 한번만 발생한다.<br>* control, option, shift, tab, delete, 방향 키와 문자, 숫자, 특수 문자 키를 놓았을 때 발생한다.

### 2.3. 포커스 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
focus | 요소가 포커스를 받았을 때(버블링하지 않는다.)
blur | 요소가 포커스를 잃었을 때(버블링하지 않는다.)
### 2.4. 폼 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
submit | submit 버튼을 클릭했을 때
reset | reset 버튼을 클릭했을 때(최근에는 사용 안함)
### 2.5. 값 변경 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
input | input(text, checkbox, radio), select, textarea 요소의 값이 입력되었을 때
change | input(text, checkbox, radio), select, textarea 요소의 값이 변경되었을 때<br>* change 이벤트는 input 이벤트와는 달리 요소가 포커스를 잃었을 때 사용자 입력이 종료되었다고 인식하여 발생한다. 즉, 사용자가 입력을 하고 있을 때는 input 이벤트가 발생하고 사용자 입력이 종료되어 값이 변경되면 change 이벤트가 발생한다.
readystatechange | HTML 문서의 로드와 파싱 상태를 나타내는 readyState 프로퍼티 값('loading','interactive','complete')이 변경될 때
### 2.6. DOM 뮤테이션 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
DOMContentLoaded | HTML 문서의 로드와 파싱이 완료되어 DOM 및 CSSOM 생성이 완료되었을때
### 2.7. 뷰 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
resize | 브라우저 윈도우(window) 크기를 리사이즈 할 때 연속적으로 발생한다.<br>* 오직 window 객체에서만 발생한다.
scroll | 웹페이지(document) 또는 요소를 스크롤할 때 연속적으로 발생한다.
### 2.8. 리소스 이벤트
이벤트 타입 | 이벤트 발생 시점
:---:|:---:
load | DOMContentLoaded 이벤트 이후, 모든 리소스(이미지, 폰트 등)의 로딩이 완료되었을 때(주로 window객체에서 발생)
unload | 리소스가 언로드 될때(주로 새로운 페이지를 요청한 경우)
abort | 리소스 로딩이 중단되었을 때
error | 리소스 로딩이 실패했을 때
## 3. 이벤트 핸들러 등록
이벤트 핸들러(event handler/listener)는 이벤트가 발생했을 때 브라우저에 호출을 위임한 함수이다. 이벤트가 발생하면 브라우저에 의해 호출될 함수가 이벤트 핸들러이다.

이벤트가 발생했을때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라고 한다.
### 3.1. 이벤트 핸들러 어트리뷰트 방식
HTML 요소의 어트리 뷰트에는 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있다. 이벤트 핸들러 어트리뷰트는 onclick과 같이 on접두사와 이벤트의 종류를 나타내는 이벤트 타입으로 이루어져 있다.
HTML 요소의 이벤트 핸들러 어트리뷰트 값으로 함수 호출문 등의 문(statement)을 할당하면 이벤트 핸들러가 등록된다.

```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button onclick="sayHi('Lee')">Click Me</button>
  <script>
    function sayHi(name) {
      console.log(`Hi! ${name}.`); // Hi! Lee.
    }
  </script>
</body>
</html>
```
주의할 것은 이벤트 핸들러 어트리뷰트 값으로 함수 참조가 아닌 함수 호출문 등의 문을 할당한다는것이다. 다음에 살펴볼 이벤트 핸들러 프로퍼티 방식에는 DOM노드의 이벤트 핸들러 프로퍼티에 함수참조를 할당한다.

이벤트 핸들러 등록이란 함수 호출을 브라우저에게 위임하는 것이라 했다. 따라서 이벤트 핸들러를 등록할 때, 콜백함수와 마찬가지로 함수참조를 등록해야 브라우저가 등록된 함수 즉, 이벤트 핸들러를 호출 할 수 있다. 만약 함수참조가 아니라 함수 호출문을 등록하면 함수 호출문의 평가 결과가 이벤트핸들러로 등록된다. 함수를 반환하는 고차함수 호출문을 이벤트 핸들러로 등록한다면 문제가 없겠지만 함수가 아닌값을 반환하는 함수호출문을 이벤트 핸들러로 등록하면 브라우저가 이벤트 핸들러를 호출 할 수 없다.

하지만 위 예제는 이벤트 핸들러 어트리뷰트 값으로 함수 호출문을 할당했다. 이때 이벤트 핸들러 어트리뷰트 값은 사실 이벤트 핸들러의 함수 몸체를 의미한다.

```
function onclick(event) {
  sayHi('Lee');
}
```
이처럼 동작하는 이유는 이벤트핸들러 어트리뷰트 값으로 함수참조를 할당하면 이벤트 핸들러에 인수를 전달하기 곤란하기 때문이다.

결국 이벤트 핸들러 어트리뷰트 값으로 할당한 문자열은 암묵적으로 정의되는 이벤트 핸들러 함수 몸체이다. 따라서 이벤트 핸들러 어트리 뷰트값으로 아래와 같이 여러개의 문을 할당할 수 있다.
```
<button onclick="console.log('Hi'); console.log('Lee');>Click Me</button>
```
이벤트 핸들러 어트리뷰트 방식은 오래된 코드에서 간혹 이 방식을 사용한 것이 있기 때문에 알아둘 필요는 있지만 더 이상 사용하지 않는 것이 좋다. HTML과 자바스크립트는 관심사가 다르므로 혼재하는 것보다 분리하는 것이 좋다.(겸손한 자바스크립트 참고)

단, CBD(Componant Based Development) 방식의 Angular/React/Svelt/Vue.js와 같은 프레임워크/라이브러리에서는 이벤트 핸들러 어트리뷰트 방식으로 이벤트를 처리한다. CBD에서는 HTML, CSS, 자바스크립트 모두를 뷰를 구성하기위한 구성요소로 보기때문에 관심사가 다르다고 생각하지 않는다.
```
<!-- Angular -->
<button (click)="handleClick($event)">Save</button>

<!-- React -->
<button onClick="{handleClick}">Save</button>

<!-- Svelte -->
<button on:click="{handleClick}">Save</button>

<!-- Vue.js -->
<button v-on:click="handleClick($event)">Save</button>
```
### 3.2. 이벤트 핸들러 프로퍼티 방식
window 객체와 Document, HTMLElement 타입의 DOM 노드 객체는 이벤트에 대응하는 이벤트 핸들러 프로퍼티를 가지고 있다. 이벤트 핸들러 프로퍼티는 이벤트핸들러 어트리뷰트와 마찬가지로 onclick과 같이 on접두사와 이벤트의 종류를 나타내는 이벤트타입으로 이루어져 있다. 이벤트 핸들러 프로퍼티에 함수를 바인딩하면 이벤트 핸들러가 등록된다.

```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button>Click Me</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
    $button.onclick = function() {
      console.log('button click');
    }
  </script>
</body>
</html>
```
이벤트 핸들러를 등록하기 위해서는 이벤트 객체, 즉 이벤트 타깃(event target)과 이벤트의 종류를 나타내는 문자열인 이벤트 타입(event type) 그리고 이벤트 핸들러를 지정할 필요가 있다. 예를 들어, 버튼요소가 클릭되면 handleClick 함수를 호출하도록 이벤트 핸들러를 등록하는 경우, 이벤트 타깃은 버튼 요소이고 이벤트 타입은 'click'이며 이벤트 핸들러는 handleClick 함수이다.

이벤트 핸들러는 대부분 이벤트를 발생시킬 이벤트 타깃에 바인딩한다. 하지만 반드시 이벤트 핸들러를 이벤트 타깃에 바인딩해야 하는것은 아니다. 이벤트 핸들러는 이벤트 타깃 또는 전파된 이벤트를 캐치할 DOM노드 객체에 바인딩한다.

이벤트 핸들러 프로퍼티 방식은 이벤트 핸들러 어트리뷰트 방식의 HTML과 자바스크립트가 뒤섞이는 문제를 해결할 수 있다. 하지만 이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러만은 바인딩할 수 있다는 단점이 있다.
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button>Click Me</button>
  <script>
    const $button = document.querySelector('button');

    /** 이벤트 핸들러 방식은 하나의 이벤트에
     *  하나의 이벤트 핸들러만을 바인딩할 수 있다.
     *  첫번째 바인딩된 이벤트 핸들러는 두번째 바인딩
     *  된 이벤트 핸들러에 의해 재할당 되어 실행되지 
     *  않는다.
     */
    $button.onclick = function() {
      console.log('button clicked 1');
    }

    /** 두번째 바인딩된 이벤트 핸들러. */
    $button.onclick = function() {
      console.log('button clicked 2');
    }
  </script>
</body>
</html>
```
### 3.3. addEventListener 메소드 방식

## 4. 이벤트 핸들러 제거
## 5. 이벤트 객체
### 5.1. 이벤트 객체의 상속 구조
### 5.2. 이벤트 객체의 공통 프로퍼티
### 5.3. 마우스 정보 취득
### 5.4. 키보드 정보 취득
## 6. 이벤트 전파
## 7. 이벤트 위임
## 8. 기본동작의 변경
### 8.1. 기본 동작 중단
### 8.2. 이벤트 전파 방지
## 9. 이벤트 핸들러 내부의 this
### 9.1. 이벤트 핸들러 어트리뷰트 방식
### 9.2. 이벤트 핸들러 프로퍼티 방식 && addEventListener 메서드 방식
## 10. 이벤트 핸들러에 인수 전달
## 11. 커스텀 이벤트
### 11.1. 커스텀 이벤트 생성
### 11.2. 커스텀 이벤트 디스패치