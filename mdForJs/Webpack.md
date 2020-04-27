## 웹팩이란?

웹팩이란 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)이다. 모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미한다.

### 모듈이란?

모듈이란 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위를 의미한다. 자바스크립트로 치면 아래와 같은 코드가 모듈이다.

```js
// math.js
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

const pi = 3.14;

export { sum, substract, pi };
```

이 `math.js` 파일은 아래와 같이 3가지 기능을 가지고 있는 모듈이다.

1. 두 숫자의 합을 구하는 `sum()` 함수
1. 두 숫자의 차를 구하는 `substrack()` 함수
1. 원주율 값을 갖는 `pi` 상수

이처럼 성격이 비슷한 기능들을 하나의 의미있는 파일로 관리하면 모듈이된다.

### 웹팩에서의 모듈

웹팩에서의 모듈은 위와 같은 자바스크립트의 모듈에만 국한되지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미한다. 웹 애플리케이션을 제작하려면 HTML, CSS, Javascript, Images, Font등 많은 파일이 필요하다. 이 파일 하나하나가 모듈이 된다.

### 모듈 번들링이란?

웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축해주는 동작을 모듈 번들링이라고 한다.

통상적으로 빌드, 번들링, 변환 모두 같은 의미로 사용된다.

## 웹팩의 등장배경

1. 파일 단위의 자바스크립트 모듈 관리의 필요성
1. 웹 개발 작업 도구(Web Task Manager)
1. 웹 애플리케이션의 빠른 로딩속도와 높은 성능

### 파일 단위의 자바스크립트 모듈관리

입문자 관점에서 고안된 자바스크립트는 아래와 같이 편리한 유효한 범위를 갖고있다.

```js
const a = 10;
console.log(a); // 10

function logText() {
  console.log(a); // 10
}
```

자바스크립트의 전역변수는 전역 스코프를 가지므로 코드의 어느부분에서든 그 변수에 접근하기가 용이하다.

```html
<!-- index.html -->
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="./app.js"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

```js
// app.js
var num = 10;
function getNum() {
  console.log(num);
}
```

```js
// main.js
var num = 20;
function getNum() {
  console.log(num);
}
```

위와 같이 `index.html`에서 두 자바스크립트를 로딩한다고 가정할 때, 스크립트에 아래와같은 코드를 실행한다고 했을때 문제점을 알아보자.

```html
<!-- index.html -->
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="./app.js"></script>
    <script src="./main.js"></script>
    <script>
      getNum(); // 20
    </script>
  </body>
</html>
```

결과는 20이다. 그 이유는 `app.js`에서 선언한 `num`변수는 `main.js`에서 다시 선언하고 20을 할당했기 때문이다.

이러한 문제점은 실제로 복잡한 애플리케이션을 개발할 때 발생한다. 변수의 이름을 모두 기억하지 않은 이상 변수를 중복 선언하거나 값을 재할당 할 수도 있기 때문이다.

### 웹 개발 작업 자동화 도구

이전부터 프론트엔드 개발 업무를 할 때 가장많이 반복하는 작업은 텍스트 편집기에서 코드를 수정하고 저장한 뒤 브라우저에서 새로고침을 누르는 것이었다. 그래야 변경된 코드에 대한 내용을 확인할 수 있었다.

이외에도 웹 서비스를 개발하고 웹 서버에 배포할때 아래와 같은 작업들을 해야했다.

- HTML, CSS, JS 압축

- 이미지 압축

- CSS 전처리기 변환

이러한 일들을 자동화 해주는 도구들이 필요했다. 그래서 Grunt와 Gulp같은 도구들이 등장하게 되었다.

### 웹 애플리케이션의 빠른 로딩속도와 높은 성능

일반적으로 특정 웹 사이트를 접근할 때 5초 이내로 웹사이트가 표시되지 않으면 대부분의 사용자들은 해당사이트를 벗어나거나 집중력을 잃게 된다.

그래서 웹 사이트의 로딩속도를 높이기위해 많은 노력들이 있었다. 그 중 대표적인 것이 브라우저에서 서버로 요청하는 파일 숫자를 줄이는 것이었고 이것을 위해 태스크 매니저를 통해 파일들을 압축하고 병합하는 작업을 진행할 것이다.

뿐만 아니라 초기 페이지 로딩 속도를 높이기 위해 나중에 필요한 자원들은 나중에 필요한 자원들은 나중에 요청하는 레이지 로딩(Lazy Loading)이 등장했다.

웹팩은 기본적으로 필요한 자원을 미리 로딩하는 것이아니라 필요할 때 요청하자는 철학을 가지고 있다.

웹펙으로 해결하고자하는 문제점을 정리하자면 아래와 같다.

- 자바스크립트 변수 유효범위

- 브라우저별 HTTP 요청 숫자의 제약

- 사용하지 않는 코드의 관리

- Dynmic Loading & Lazy Loading 미지원

### 자바스크립트 변수 유효 범위문제 해결

웹팩은 변수 유효범위 문제를 **ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결**한다.

### 브라우저별 HTTP 요청 숫자의 제약 해결

TCP 스펙에 따르면 브라우저에서 한 번에 서버로 보낼 수 있는 HTTP 요청 숫자는 제약이 있다. 따라서, HTTP 요청 숫자를 줄이는 것이 웹 애플리케이션의 성능을 높여줄 뿐만아니라 사용자가 사이트를 조작하는 시간을 앞당겨 줄 수 있다.

**웹팩을 통해 여러개의 파일을 하나의 파일로 합치면 위와 같은 브라우저별 HTTP 요청 숫자 제약을 피할 수 있다.**

### Dynamic Loading & Lazy Loading 미지원

Require.js와 같은 라이브러리를 쓰지 않으면 동적으로 원하는 순간에 모듈을 로딩하는것이 불가능했다. 그러나 이제는 웹팩의 **Code Splitting** 기능을 이용하여 원하는 모듈을 원하는 타이밍에 로딩할 수 있게 되었다.