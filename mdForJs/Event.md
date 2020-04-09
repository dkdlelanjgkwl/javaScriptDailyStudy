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
### 3.3. addEventListener 메서드 방식
DOM level 2에서 도입된 EventTarget.prototype.addEventListener 메소드를 사용하여 이벤트를 등록할 수 있다.

addEventListener 메서드의 첫번째 매개변수에 이벤트 종류를 나타내는 문자열인 이벤트타입을 전달한다. 이때 이벤트 핸들러 프로퍼티 방식과는 달리 on 접두사를 붙이지 않는다. 두번째 매개변수에는 이벤트 핸들러를 전달한다. 마지막 매개변수에는 이벤트를 캐치할 이벤트 전파단계(캡쳐링 버블링)를 지정한다. 생략하거나 false를 지정하면 버블링 단계에서 이벤트를 캐치하고 true를 지정하면 캡쳐링 단계에서 이벤트를 캐치한다.
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

    $button.addEventListener('click', function() {
      console.log('button clicked');
    });
  </script>
</body>
</html>
```
만약 동일한 요소에서 발생한 동일한 이벤트에 대해서 이벤트핸들러 프로퍼티 방식과 addEventListener 메서드 방식 모두를 사용하여 이벤트 핸들러를 등록하면 어떤식으로 작동할지 예상해 보자.
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

    $button.onclick = function() {
      console.log('[이벤트 핸들러 프로퍼티 방식]');
    }

    $button.addEventListener('click', function() {
      console.log('[addEventListener 메소드 방식]');
    });
  </script>
</body>
</html>
```
addEventListener 방식은 이벤트 핸들러 프로퍼티에 바인딩된 이벤트 핸들러에 아무런 영향을 주지 않는다. 따라서 버튼요소에 클릭 이벤트가 발생하면 2개의 이벤트 핸들러 모두가 호출된다.

동일한 요소에서 발생한 동일한 이벤트에 대해 이벤트 핸들러 프로퍼티 방식은 하나이상의 이벤트 핸들러를 바인딩할 수 없지만 addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록시킬 수 있다. 이때 이벤트 핸들러는 등록된 순서대로 호출 된다.
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

    $button.addEventListener('click', function() {
      console.log('[1]');
    });

    $button.addEventListener('click', function() {
      console.log('[2]');
    });
  </script>
</body>
</html>
```
단, addEventListener를 통해 참조가 동일한 이벤트 핸들러를 중복 등록하게 되면 하나의 이벤트 핸들러만 등록되게 된다.
```
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    const handleClick = () => console.log('button click');

    // 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 핸들러만 등록된다.
    $button.addEventListener('click', handleClick);
    $button.addEventListener('click', handleClick);
  </script>
</body>
</html>
```
## 4. 이벤트 핸들러 제거
addEventListener 메서드로 등록한 이벤트 핸들러를 제거하려면 EventTarget.prototype.removeEventListener 메서드를 사용한다.
removeEventListener 메서드에 전달할 수 있는 인수는 addEventListener 메서드와 동일하다. 단 addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에 전달한 인수가 일치하지 않으면 이벤트 핸들러는 제거되지 않는다.
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

    const clickFunc = () => console.log('button clicked');

    /** 3번째 인수가 생략되어있지만 생략했을 시 false값을
     *  기본값으로 가지고 있다.
     */
    $button.addEventListener('click', clickFunc); 

    /** EventListener를 등록할때 false값을 3번째 인자로 false를
     *  입력 받았기 때문에 3번째 인수로 true 값을 줄 시엔
     *  인수가 일치하지 않는것으로 평가되어 EventListener가
     *  삭제되지 않는다. 
    */
    $button.removeEventListener('click', clickFunc, true); // 삭제 실패

    $button.removeEventListener('click', clickFunc); // 삭제 성공
  </script>
</body>
</html>
```
removeEventListener 메소드에 전달한 제거 대상 이벤트 핸들러는 addEventListener 메소드에 전달한 등록 이벤트 핸들러는 동일한 참조를 갖는 함수이어야 한다. 따라서 아래와 같이 무명 함수를 이벤트 핸들러로 등록한 경우, 제거할 수 없다. 이벤트 핸들러를 제거하려면 이벤트 핸들러의 참조를 변수나 자료 구조에 저장하고 있어야 한다.
```
// 이벤트 핸들러 등록
// 이벤트 핸들러를 참조할 수 없으므로 제거할 수 없다
$button.addEventListener('click', () => console.log('button click'));
```
단, 이벤트 핸들러 내부에서 removeEventListener 메소드를 호출하여 자신을 제거하는 방법은 가능하다. 이때 이벤트 핸들러는 단 한번 호출된다.
```
// 기명 함수를 이벤트 리스너로 등록
$button.addEventListener('click', function foo() {
  console.log('button click');
  /** 이벤트 핸들러가 호출되면 작업을 수행 후 
   *  이벤트 핸들러를 제거한다.
   *  따라서 이벤트 핸들러는 단 한번만 호출된다.
   */
  $button.removeEventListener('click', foo);
});
```
기명함수를 이벤트 핸들러로 등록할 수 없다면 호출된 함수, 즉 함수자신을 가리키는 arguments.callee를 사용할 수도 있다.
```
$button.addEventListener('click', function () {
  console.log('button click');
  // arguments.callee는 호출된 함수, 즉 함수 자신을 가리킨다.
  $button.removeEventListener('click', arguments.callee);
});
```
arguments.callee는 코드최적화를 방해하므로 strict 모드에서 사용이 금지된다. 따라서 가급적 이벤트 핸들러의 참조를 변수나 자료구조에 저장하여 제거하는 편이 좋다.

이벤트 프로퍼티방식으로 등록한 이벤트 핸들러는 removeEventListener 메서드로 제거할 수 없다. 이벤트 핸들러를 제거하려면 이벤트 핸들러 프로퍼티에 null을 할당한다.
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

    const clickFunc = () => console.log('button clicked');

    // 이벤트 핸들러 프로퍼티 방식으로 핸들러 등록
    $button.onclick = clickFunc;

    // 이벤트 핸들러 프로퍼티방식으로 등록된 핸들러 삭제
    $button.onclick = null;
  </script>
</body>
</html>
```
## 5. 이벤트 객체
### 5.1. 이벤트 객체의 상속 구조

### 5.2. 이벤트 객체의 공통 프로퍼티
Event 인터페이스, 즉 Event.prototype에 정의되어 있는 이벤트 관련 프로퍼티는 UIEvent, CustomEvent, MouseEvent 등 모든 파생 이벤트 객체에 상속된다. 즉, Event 인터페이스의 모든 이벤트 객체의 공통 프로퍼티를 파생 이벤트 객체에 상속한다. 이벤트 객체의 공통 프로퍼티는 아래와 같다.

프로퍼티 | 설명 | 타입
:---:|:---:|:---:|
type | 이벤트 타입 | 문자열
target | 이벤트를 발생시킨 DOM요소 | DOM요소 노드
currentTarget | 이벤트 핸들러가 바인딩된 DOM요소 노드 | DOM요소 노드
eventPhase | 이벤트 전파단계를 나타낸다.<br> 0: 이벤트 없음 1: 캡처링 단계 2: 타깃단계 3: 버블링 단계 | 숫자
bubbles | 이벤트를 버블링으로 전파하는지 여부를 나타낸다.<br> 아래 이벤트는 bubbles: false로 버블링 하지 않는다.<br> - 포커스 이벤트 focus / blur<br> - 리소스 이벤트 load / unload / abort / error<br> - 마우스 이벤트 mouseenter / mouseleave | 불리언
cancelable | preventDefault 메서드를 호출하여 이벤트를 취소하였는지 여부를 나타낸다. | 불리언
isTrusted | 사용자의 행위에 의해 발생한 이벤트 인지 여부를 나타낸다.<br> * 자바스크립트 코드를 통해 인위적으로 발생시킨 이벤트. 예를 들어 click 메서드 또는 dispatchEvent 메서드를 통해 발생시킨 이벤트인 경우, isTrusted는 false이다. | 불리언
timeStamp | 이벤트가 발생한 시각(1970/01/01/00:00:00부터 경과한 밀리초)	 | 숫자

예를 들어 체크박스 요소의 체크상태가 변경되면 현재 체크상태가 출력되도록 출력해 보자
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <input type="checkbox">
  <em class="message">off</em>
  <script>
    const $checkBox = document.querySelector('input[type=checkbox]');
    const $message = document.querySelector('.message');

    $checkBox.onchange = function(e) {
      console.log(e); // Event { ... }
      
      /** 이벤트 객체 e의 프로토타입은
       *  Event.prototype 이다.
       */
      console.log(Object.getPrototypeOf(e));


      console.log(e.type); // change
      console.log(e.target); // <input type="checkbox">
      console.log(e.currentTarget); // <input type="checkbox">
      console.log(e.cancelable); // false
      console.log(e.isTrusted); // true
      console.log(e.eventPhase); // 2
      $message.textContent = e.target.checked ? 'on' : 'off';
    };
  </script>
</body>
</html>
```
사용자 입력에 의해 체크박스 요소의 체크상태가 변경되면 checked 프로퍼티의 값이 변경되고 change 이벤트가 발생한다. 이때 Event 타입의 이벤트 객체가 생성된다.(위 코드에서 e라는 식별자) 이벤트 객체의 target프로퍼티는 이벤트를 발생시킨 객체를 가리킨다.(e.target) 따라서 target 프로퍼티가 가리키는 객체는 change 이벤트를 발생시킨 DOM 요소이고 이객체의 checked 프로퍼티는 현재의 체크상태를 나타낸다.

이벤트 객체의 currentTarget 프로퍼티는 이벤트 핸들러가 바인딩된 DOM 요소를 가리킨다. 위 예제의 경우, 이벤트를 발생시킨 DOM 요소와 이벤트 핸들러가 바인딩된 DOM 요소는 모두 $checkBox이다. 따라서 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 노드 요소를 가리킨다.

이처럼 일반적으로 이벤트 객체의 Target프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 요소를 가리키지만 이벤트 위임에서는 이벤트 객체의 target 프로퍼티와 currnetTarget 프로퍼티는 다른 요소를 가리킬 수 있다는점을 유의하도록 하자.
### 5.3. 마우스 정보 취득
click, dbclick, mousedown, mouseup, mousemove, mousenter, mouseleave 이벤트가 발생하면 생성되는 MouseEvent 타입의 이벤트 객체는 아래와 같은 고유의 프로퍼티를 갖는다.

- 마우스 포인터의 좌표 정보를 나타내는 프로퍼티: screenX/screenY, clientX/clientY, pageX/pageY, offsetX/offsetY
- 버튼 정보를 나타내는 프로퍼티: altKey, ctrlKey, shiftKey, button

예를 들어, DOM 요소를 드래그하여 이동시키는 예제를 만들어 보도록하자. 드래그는 마우스 버튼을 누른상태에서 마우스를 이동하는 것으로 시작하고 마우스 버튼을 떼면 종료한다. 따라서 드래그는 mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생한 시점에서 시작하고 mouseup 이벤트가 발생한 시점에 종료한다.

드래그가 시작되면 드래그 시작시점, 즉 mousedown 이벤트가 발생했을 때의 마우스 포인터 좌표와 드래그를 하고있는 시점, 즉 mouse 이벤트가 발생할 때마다의 마우스 포인터 좌표를 비교하여 드래그 대상의 이동거리를 계산한다.

그리고 종료시점은 mouseup 이벤트 발생시점으로 하고 이때 드래그 대상요소를 이동시키는 이벤트 핸들러를 제거하여 이동을 멈춘다.

마우스 포인터 좌표는 MouseEvent 타입의 이벤트 객체에서 제공한다. mousedown, mouseup, mousemove 이벤트가 발생하면 생성되는 MouseEvent 타입의 이벤트 객체는 마우스 포인터의 좌표정보를 나타내는 screenX/screenY, clientX/clinetY, pageX/pageY, offsetX/offsetY 프로퍼티를 제공한다. 이 프로퍼티 중에서 clientX/clientY는 뷰포트 (Viewport), 즉 웹페이지의 가시영역을 기준으로 마우스 포인터 좌표를 나타낸다.
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background-color: #fff700;
      border: 5px solid orange;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <script>
    const $box = document.querySelector('.box');

    const initialMousePos = { x: 0, y: 0 }; // 멈췄을때 상자 좌표나타내주기.

    const offset = { x: 0, y: 0 }; // 드래그 이벤트가 일어나는 중에 마우스 좌표

    // 드래그이벤트 = mousedown + mousemove 조합
    // 드래그 이벤트 종료 = mouseup
    // 이동거리 계산(offset) = (mousemove + mousedown)'s offset - mousedownEvent's initial(시작 position)
    // 이동거리를 계산할 초기 시작점(initialMousePos) = clientX/clientY - offset.x/offset.y

    /** 
     * 구현해야할 목록.
     * 
     * 드래그 이벤트 : MouseEvent의 clientX/clientY 속성을 통해 마우스이벤트 발생했을시 좌표값을 구하고 
     *                transform 속성의 translate3d() 함수를 통해 박스를 이동시키는 
     *                eventListener를 구현해서 등록
     * 
     * 드래그 이벤트 종료(mouseupEvent) : 드래그 이벤트때 발생하는 EventListener 제거
     */

     function getStartPos(e) {
      initialMousePos.x = e.clientX - offset.x;
      initialMousePos.y = e.clientY - offset.y;

      document.addEventListener('mousemove', moveBox);
     }

     function moveBox(e) {
      offset.x = e.clientX - initialMousePos.x;
      offset.y = e.clientY - initialMousePos.y;

      $box.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
     }
     
     $box.addEventListener('mousedown', getStartPos);

     document.addEventListener('mouseup', () => {
       document.removeEventListener('mousemove', moveBox);
     });
  </script>
</body>
</html>
```
### 5.4. 키보드 정보 취득
keydown, keyup, keypress 이벤트가 발생하면 생성되는 KeyBoardEvnet 타입의 이벤트 객체는 artKey, ctrlKey, shiftKey, metaKey, key, keyCode와 같은 고유 프로퍼티를 갖는다.

예를 들어, input요소의 입력필드에 엔터 키가 입력되면 현재까지 입력필드에 입력된 값을 출력하는 예제를 만들어 보도록하자.
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <input type="text">
  <script>
    $input = document.querySelector('input[type=text]');

    $input.addEventListener('keypress', (e) => {
      if(e.keyCode !== 13) return;
      
      const $em = document.createElement('em');
      const textNode = document.createTextNode(`${e.target.value}`);
      $em.appendChild(textNode);
      $em.style.display = 'block';
      document.body.appendChild($em);

      $input.value = '';
    });
  </script>
</body>
</html>
```
## 6. 이벤트 전파

DOM 트리상에 존재하는 DOM요소 노드에서 발생하는 이벤트는 DOM트리를 통해 전파된다. 이를 이벤트 전파(event propagatino)이라고 한다. 예를 들어, 아래 예제를 살펴보자.
```
<!DOCTYPE html>
<html>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
</body>
</html>
```

ul의 두번째 자식요소인 li 요소를 클릭할시에 클릭이벤트가 발생한다고 가정해보자. 이때 생성된 이벤트 객체는 이벤트를 발생시킨 DOM요소인 이벤트 타깃(event target)을 중심으로 DOM트리를 통해 전파된다. 이벤트 전파는 이벤트 객체가 전파되는 방향에 따라 3단계로 구분할 수 있다.

- 캡처링 단계(capturing phase): 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계(target phase): 이벤트가 이벤트 타깃에 도달
- 버블링 단계(bubbling phase): 이벤트가 하위요소에서 상위 요소 방향으로 전파

이처럼 DOM트리를 통해 전파되는 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있다. 예를 들어, 위 예제의 ul 요소에 이벤트 핸들러를 바인딩하면 자신이 발생시킨 이벤트 뿐만 아니라 하위요소에서 발생한 이벤트까지 캐치할 수 있다. 하위 요소에서 발생한 이벤트는 버블링 되기 때문이다.

이벤트 핸들러는 기본적으로 타깃단계와 버블링 단계의 이벤트를 캐치한다.
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');
    /** 
     * #fruits 요소에 바인딩된 이벤트 핸들러는 버블링 단계의
     * 이벤트를 캐치한다.
     * 따라서 이벤트 핸들러는 $fruits 요소와 $fruits 하위 요소에서
     * 발생하여 버블링되는 이벤트를 모두 캐치할 수 있다.
     * 
    */
    $fruits.onclick = e => {
      // 버블링 단계와 target 단계두가지만 캐치하기때문에 eventPhase값은 2또는 3의 값이 나온다.
      console.log(`이벤트 단계: ${e.eventPhase}`);
      console.log(`이벤트 타깃: ${e.target.nodeName}#${e.target.id}`);
    };
  </script>
</body>
</html>
```
이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 타깃단계와 버블링 단계의 이벤트만 캐치할 수 있다. 하지만 addEventListener 방식으로 등록한 이벤트 핸들러는 버블링 또는 캡처링 단계의 이벤트를 선별적으로 캐치할 수 있다. 캡처링 단계의 이벤트를 캐치하려면 addEvetnListener 메서드의 3번째 인수로 true를 전달해야한다. 3번째 인수를 생략하거나 false를 전달하면 타깃단계와 버블링 단계의 이벤트만을 캐치할 수 있다.

```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');
    
    $fruits.addEventListener('click', e => {
      /**
       * li의 첫번째요소인 #apple을 클릭했을시에 log.
       * apple (6) [li#apple, ul#fruits, body, html, document, Window] 3
       * 
       * ul 요소인 #fruits를 클릭했을시에 log.
       * 이벤트 단계: fruits (5) [ul#fruits, body, html, document, Window] 2
       * 
       * addEventListener 메서드를 사용할때 3번째 인자값을 주지않거나 false
       * 를 주었을시에 target 단계 이벤트와 bubbling단계 이벤트 캐치를 할 수 있다.
      */
      console.log(`이벤트 단계: ${e.target.id}`, e.composedPath(), e.eventPhase);
    });
  </script>
</body>
</html>
```
버블링 단계 또는 캡쳐링 단계의 모든 이벤트는 이벤트 패스(이벤트가 통과하는 DOM트리상의 경로)에 위치한 모든 DOM 요소에서 캐치할 수 있다. 참고로 이벤트 패스는 Evnet.prototype.composedPath 메서드로 확인할 수 있다.

아래 예제는 캡쳐링 단계의 이벤트와 버블링 단계의 이벤트를 캐치하는 이벤트 핸들러가 혼용되는 경우이다.

```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>버블링과 캡쳐링 이벤트<button>버튼</button></p>
  <script>
    const $p = document.querySelector('p');
    const $btn = document.querySelector('button');

    // 버블링 단계만 캐치
    document.body.addEventListener('click', () => console.log('handler for body'));
    $btn.addEventListener('click', () => console.log('handler for button'));

    // 캡쳐링 단계만 캐치
    $p.addEventListener('click', () => console.log('handler for paragraph'), true);
  </script>
</body>
</html>
```
위 예제의 경우 body, button 요소는 버블링 단계의 이벤트만을 캐치하고 p요소는 캡쳐링 단계의 이벤트만을 캐치한다.

**이벤트가 실행될때 이벤트를 찾는 과정은 캡쳐링 -> 타겟 -> 버블링 순으로 검색을 한다.** 만약 button요소에서 클릭이벤트로 핸들러가 호출되게 된다면 p요소에 캡쳐링을 캐치하는 이벤트 핸들러가 등록되어 있으므로 이벤트 검색순서에서 캡처링이 먼저 실행되기 때문에 p요소의 이벤트 핸들러가 먼저 호출되고(캡쳐링 단계) 그다음에 button 요소의 이벤트핸들러가 호출되고(타깃단계) 그다음 버블링단계 이벤트로 document body에 등록했던 이벤트 핸들러(bubbling 단계)가 호출되게된다.

따라서 button을 클릭했을시에 log는 아래와 같다
```
Handler for paragraph.
Handler for button.
Handler for body.
```
만약 p 요소에서 클릭이벤트가 발생하면 캡처링 단계를 캐치하는 p요소의 이벤트 핸들러가 호출되고 버블링 단계를 캐치하는 body 요소의 이벤트핸들러가 실행되어 아래와 같은 log가 찍히게 된다.
```
Handler for paragraph.
Handler for body.
```
## 7. 이벤트 위임
사용자가 네비게이션 아이템(li 요소)을 클릭하여 선택하면 현재 선택된 네비게이션 아이템을 구별하기 위해 클래스를 추가하는 아래 예제를 살펴보도록하자.
```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #fruits {
      display: flex;
      list-style-type: none;
      padding: 0;
    }

    #fruits li {
      width: 100px;
      cursor: pointer;
    }

    #fruits .active {
      color: red;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav>
    <ul id="fruits">
      <li id="apple" class="active">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </nav>
  <div>선택된 네비게이션 아이템: <em class="msg">apple</em></div>
  <script>
    /**
     * 사용자 클릭에 의해 선택된 네비게이션 아이템(li 요소)에 active 클래스를 추가하고
     * 그외의 모든 네비게이션 아이템의 active클래스를 제거한다.
     * 그리고 선택된 아이템을 em 요소의 자식요소로 추가한다.
    */
    const $ul = document.querySelector('#fruits');
    const $msg = document.querySelector('.msg');

    /**
     * Evnet 인터페이스의 프로퍼티를
     * 디스트럭쳐링 할당을 통해 인자로 받아준다.
    */
    function activate({ target }) {
      // console.log(Object.getOwnPropertyNames(Event.prototype));

      [...$ul.children].forEach(fruit => {
        fruit.classList.toggle('active', target === fruit);

        /**
         * target.firstChild는 노드객체로 반환.
         * textNode의 text를 알기위해선 charactorData로 부터
         * 상속받은 프로퍼티인 wholeText를 이용하여 DOMString
         * (문자열)을 얻어낸다.
        */
        $msg.textContent = target.firstChild.wholeText;
      });
    }

    document.getElementById('apple').onclick = activate;
    document.getElementById('banana').onclick = activate;
    document.getElementById('orange').onclick = activate;
  </script>
</body>
</html>
```
위 예제를 살펴보면 모든 네비게이션 아이템(li 요소)이 클릭이벤트에 반응하도록 모든 네비게이션 아이템에 이벤트핸들러 activate를 등록하였다. 만일 네비게이션 아이템이 100개라면 100개의 이벤트 핸들러를 등록해야한다. 이는 많은 DOM요소에 이벤트핸들러를 등록하므로 성능저하의 원인이 될뿐만 아니라 유지보수에도 부적합한 코드를 생산하게 된다.

이벤트 위임(Event delegation)은 다수의 하위 요소에 이벤트 핸들러를 등록하는 대신 하나의 상위요소에 이벤트 핸들러를 등록하는 방식을 말한다. 하위 요소에서 발생한 이벤트는 버블링단계(bubbling phase)에서 부모요소 방향으로 전파된다. 따라서 상위 요소는 하위 요소에서 발생한 이벤트를 캐치할 수 있다. 이벤트 위임을 통해 상위 DOM요소에 이벤트 핸들러를 등록하면 여러 개의 하위요소에 이벤트 핸들러를 등록할 필요가 없다. 또한 동적으로 하위 요소를 추가하더라도 일일이 추가된 요소에 이벤트 핸들러를 등록할 필요가 없다.

이벤트 위임을 통해 위 예제를 수정해 보자

```
<!DOCTYPE html>
<html lang="ko-kr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #fruits {
      display: flex;
      list-style-type: none;
      padding: 0;
    }

    #fruits li {
      width: 100px;
      cursor: pointer;
    }

    #fruits .active {
      color: red;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav>
    <ul id="fruits">
      <li id="apple" class="active">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </nav>
  <div>선택된 네비게이션 아이템: <em class="msg">apple</em></div>
  <script>
    /**
     * 사용자 클릭에 의해 선택된 네비게이션 아이템(li 요소)에 active 클래스를 추가하고
     * 그외의 모든 네비게이션 아이템의 active클래스를 제거한다.
     * 그리고 선택된 아이템을 em 요소의 자식요소로 추가한다.
    */
    const $ul = document.querySelector('#fruits');
    const $msg = document.querySelector('.msg');

    function activate({ target }) {
      
      if (!target.matches('#fruits > li')) return;

      [...$ul.children].forEach(fruit => {
        fruit.classList.toggle('active', target === fruit);

        $msg.textContent = target.firstChild.wholeText;
      });
    }
    // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있다.
    $ul.onclick = activate;
  </script>
</body>
</html>
```
이벤트 위임을 통해 하위 요소에서 발생한 이벤트를 처리할 때 주의할 것은 상위 요소에 이벤트 핸들러를 등록하기 때문에 이벤트 타깃, 즉 이벤트를 실제로 발생시킨 DOM 요소가 개발자가 기대한 DOM요소가 아닐 수도 있다는 것이다. 위 예제의 경우, ul#fruits 요소에 바인딩된 이벤트 핸들러는 자기 자신은 물론  ul#fruits 요소의 하위 요소 중에서 클릭이벤트를 발생시킨 모든 요소에 반응한다. 따라서 이벤트에 반응이 필요한 요소(위 예제의 경우 #fruits > li 선택자에 의해서 선택되는 요소)에 한정하여 이벤트 핸들러가 실행되도록 이벤트 타깃을 검사할 필요가 있다.
```
function activate({ target }) {
  // 이벤트를 발생시킨 요소(target)이 ul#fruits의 자식 요소가 아니라면 무시한다.
  if (!target.matches('#fruits > li')) return;
  ...
```
element.prototype.matches 메서드는 인수로 전달된 선택자에 의해 특정 노드를 탐색가능한지 확인한다.

일반적으로 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 요소를 가리키지만 이벤트 위임을 통해 상위 요소에 이벤트를 바인딩한 경우, 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티가 다른 DOM 요소를 가리킬 수 있다. 위 예제에서는 아래와 같이 $ul 요소에 이벤트를 바인딩하였다.
```
$ul.onclick = activate;
```
이때 이벤트 객체의 currentTarget 프로퍼티는 언제나 변함없이 $ul 요소를 가리키지만 이벤트 객체의 target 프로퍼티는 실제로 이벤트를 발생시킨 요소를 가리킨다. $ul 요소도 클릭 이벤트를 발생시킬 수 있으므로 이 경우 이벤트 객체의 currentTarget 프로퍼티와 target 프로퍼티는 동일한 $ul 요소를 가리키지만 $ul 요소의 하위 요소에서 클릭 이벤트가 발생한 경우 이벤트 객체의 currentTarget 프로퍼티와 target 프로퍼티는 다른 요소를 가리킨다.

포커스 이벤트 focus, blur는 이벤트가 버블링되지 않는다. 따라서 하위요소에서 focus, blur이벤트를 발생시키는 경우, 이벤트 위임을 사용할 수 없다.
```
<!DOCTYPE html>
<html>
<body>
  <div class="container">
    <input type="text">
  </div>
<script>
  const $container = document.querySelector('.container');

  // input 이벤트는 버블링되므로 상위 요소에 이벤트 위임을 할 수 있다.
  $container.addEventListener('input', e => {
    console.log(e); // InputEvent {...}
  });

  // focus 이벤트는 버블링되지 않으므로 상위 요소에 이벤트 위임을 할 수 없다.
  $container.addEventListener('focus', e => {
    console.log(e); // 절대로 이벤트가 발생하지 않는다.
  });

  // blur 이벤트는 버블링되지 않으므로 상위 요소에 이벤트 위임을 할 수 없다.
  $container.addEventListener('blur', e => {
    console.log(e); // 절대로 이벤트가 발생하지 않는다.
  });
</script>
</body>
</html>
```
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