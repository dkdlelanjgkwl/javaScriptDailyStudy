## 1. 노드
### 1.1. 노드객체의 타입
1. **문서노드**<br><br>
DOM트리의 최상위에 존재하는 root node로서 document객체를 가리킨다.<br>document객체는 브라우저가 렌더링한 HTML문서 전체를 가리키는 객체로서 전역객체 window의 document프로퍼티에 바인딩되어있음.<br>
브라우저 환경의 모든 자바스크립트 코드는 script태그에 의해 분리되어있어도 하나의 전역객체 window를 공유한다.<br>
즉, HTML문서당 document객체는 유일하다.<br>
document객체는 DOM트리의 root node이므로 DOM트리의 노드들에 접근하기 위한 진입점(entry point) 역할을 담당한다.

1. **요소 노드**<br><br>
요소노드는 HTML요소를 가리키는 객체이다. 요소노드는 HTML 요소간에 중첩에 의해 부자관계를 가지며 이러한 부자관계를 통해 정보를 구조화한다.
1. **어트리뷰트 노드**<br><br>
HTML요소의 어트리뷰트를 가리키는 객체이다. 어트리뷰트 노드는 어트리뷰트가 지정된 HTML요소의 요소 노드와 형제관계(Sibling)를 갖는다. 따라서 요소노드에 접근하면 어트리뷰트 노드에 접근하여 어트리뷰트를 참조또는 변경할 수 있다.
1. **텍스트 노드**<br><br>
HTML요소의 텍스트를 가리키는 객체이다. 텍스트 노드는 요소노드의 자식 노드이며 자신의 자식요소를 가질 수 없는 리프노드(leaf node)이다. 즉, 텍스트 노드는 DOM트리의 최종단이다.

### 1.2. 노드객체의 상속구조
> 모든 노드객체는 Object, EvnetTarget, Node객체의 인터페이스를 상속받는다.<br> 추가적으로 문서노드는 Document, HTMLDocument 인터페이스를 상속받는다.<br> 어트리뷰트 노드는 Attr, 문서노드는 CharactorData 인터페이스를 상속받는다.<br> 요소노드는 Element 인터페이스를 상속받고 추가적으로 HTMLElement와 태그 종류별로 세분화된 HTMLHeadElement, HTMLBodyElement 등의 인터페이스를 상속받는다. <br>

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <input tpye="text">
      <script>
        const $input = document.querySelector('input');
        console.log(Object.getPrototypeOf($input)); // HTMLInputElement { ... }
        console.log(Object.getPrototypeOf(HTMLInputElement.prototype)); // HTMLElement {…}
        console.log(Object.getPrototypeOf(HTMLElement.prototype)); // Element {…}
        console.log(Object.getPrototypeOf(Element.prototype)); // Node {…}
        console.log(Object.getPrototypeOf(Node.prototype)); // EventTarget {…}
        console.log(Object.getPrototypeOf(EventTarget.prototype)); // { constructor: ƒ Object(), …}
        console.log(Object.getPrototypeOf(EventTarget.prototype) === Object.prototype); // true
        console.log($input); // <input type="text">
        /** Object.prototype.toString() 메서드는 기본적으로 "[object type]" 형식으로 값을 반환한다. */
        console.log($input.toString()); // [object HTMLInputElement]
        /** 어떤 객체에 대한 기본설명으로 사용되는 문자열값을 얻기위해
        * Object.prototype.toString() 메서드대신 [Symbol.toStringTag] 를 사용하여 
        * 객체에 대한 기본 설명(description)으로 사용되는 문자열 값을 얻어낼 수 있다.
        */
        console.log($input[Symbol.toStringTag]); // HTMLInputElement
      </script>
    </body>
    </html>
input 요소노드 객체의 특성 | 프로토타입을 제공하는 객체
:---:|:---:
객체 | Object
이벤트 발생시키는 객체 | Evnet Target
트리자료구의 노드 객체 | Node
브라우저가 렌더링할 수 있는 웹문서의 요소(HTML, XML, SVG) | Element
웹문서의 요소중에서 HTML 요소를 표현하는 객체 | HTMLElement
HTML 요소중에서 input 요소를 표현하는 객체 | HTMLInputElement

**노드객체의 상속도구는 개발자도구의 Elemnet 패널 우측의 Properties 패널에서 확인할 수 있다.**

**DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류에 따라 상속을 통해 자신에 필요한 기능, 즉 프로퍼티와 메소드의 집합인 DOM API(Application Programming Interface)를 제공한다. DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.**

## 2. 요소 노드취득
### 2.1. ID로 요소노드 취득
> Document.prototype.getElementById 메소드는 인수로 전달한 id 어트리뷰트 값(id 값)을 갖는 하나의 요소 노드를 탐색하여 반환한다.

id 값은 HTML 문서 내에서 유일한 값이어야 하며 class 어트리뷰트와는 달리 공백 분자로 구분하여 여러 개의 값을 가질 수 없다. 단, HTML 문서 내에 중복된 id 값을 갖는 요소가 여러 개 존재하더라도 어떠한 에러도 발생하지 않는다. 즉, HTML 문서 내에는 중복된 id 값을 갖는 요소가 여러 개 존재할 가능성이 있다.

이러한 경우, getElementById 메소드는 인수로 전달된 id 값을 갖는 첫번째 요소 노드만을 반환한다. 즉, getElementById 메소드는 언제나 단 하나의 요소 노드를 반환한다.

만약 인수로 전달된 id 값을 갖는 요소가 존재하지 않는 경우, getElementById 메소드는 null을 반환한다.

HTML 요소에 id 어트리뷰트를 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 노드 객체가 할당되는 부수 효과(side effect)가 있다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <div id="foo"></div>
      <script>
        /** id값과 동일한 변수이름이 암묵적으로 선언되고 노드객체가 변수에 바인딩된다.(side effect) */
        console.log(foo); // <div id="foo"></div>
        console.log(foo === document.getElementById('foo')); // true
        /** 전역객체에 바인딩되어있는 foo라는 프로퍼티를 삭제해도 
        * 노드객체가 바인딩되어있는 foo라는 변수는 삭제되지 않는다. */
        delete foo;
        console.log(foo); // <div id="foo"></div>
      </script>
    </body>
    </html>
단, id 값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 이 전역 변수에 노드 객체가 재할당되지 않는다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <div id="foo"></div>
      <script>
        /** id값과 동일한 이름으로 전역변수가 선언되어있으면
        * id값과 동일한 이름으로 바인딩되는 노드객체는 무시된다. */
        let foo = 1;
        console.log(foo); // 1
      </script>
    </body>
    </html>
### 2.2. 태그이름으로 요소노드 취득
> Document.prototype/Element.prototype.getElementsByTagName 메소드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드 들을 탐색하여 반환한다. 메소드 이름에 포함된 Elements가 복수형인 것에서 알 수 있듯이 getElementsByTagName 메소드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 **HTMLCollection 객체를 반환**한다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
      <script>
        const $listEl = document.getElementsByTagName('li');
        console.log($listEl === Array); // false
        console.log(typeof $listEl); // object
        console.log($listEl.constructor); // ƒ HTMLCollection() { [native code] }
        console.log(Object.getPrototypeOf($listEl)); // HTMLCollection {...}
        /** 요소노드를 취득한 $listEl 객체는 Object타입이고 HTMLCollection 함수가 생성한 iterator객체이다.
        *  따라서 반복하면서 어떤작업을 순회하는 배열 메소드를 사용하려면
        * spread 문법을 사용해서 배열로 만들어 줘야한다.
          */
        [...$listEl].forEach((el) => el.style.color = 'red' );
      </script>
    </body>
    </html>

getElementsByTagName 메소드는 Document.prototype에 정의된 메소드와 Element.prototype에 정의된 메소드가 있다. Document.prototype.getElementsByTagName 메소드는 DOM의 루트 노드인 문서 노드 즉, document 객체를 포함해서 HTML 문서 전체에서 요소 노드를 탐색하여 반환하고 Element.prototype.getElementsByTagName 메소드는 특정 요소 노드부터 시작하여 요소 노드를 탐색하여 반환한다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li>apple</li>
        <li>banana</li>
        <li>orange</li>
        <li>melon</li>
      </ul>
      <ul>
        <li>html</li>
      </ul>
      <script>
        // Element.prototype.getElementsByTagName
        const $fruits = document.getElementById('fruits');
        const $list = $fruits.getElementsByTagName('li');

        // document.prototype.getElementsByTagName
        const $listDoc = document.getElementsByTagName('li');

        console.log($list); // HTMLCollection(4) [li, li, li, li]
        console.log($listDoc); // HTMLCollection(5) [li, li, li, li, li]
      </script>
    </body>
    </html>
### 2.3. class로 요소노드 취득
### 2.4. CSS선택자로 요소노드 취득
CSS 선택자 문법을 사용하는 querySelector, querySelectorAll 메소드는 getElementById, getElementsBy*** 메소드보다 다소 느린 것으로 알려져 있다. 하지만 CSS 선택자 문법으로 보다 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있다. 따라서 id가 있는 요소를 취득하는 경우에는 getElementById 메소드를 사용하고 그 외의 경우에는 querySelector, querySelectorAll 메소드를 사용하는 것을 추천한다.

## 3. HTMLCollection과 NodeList
HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체이다. HTMLCollection과 NodeList는 모두 유사 배열 객체이자 이터러블이다. 따라서 for 문으로 순회할 수 있으며 스프레드 문법을 사용하여 간단히 배열로 변환할 수 있다.

### 3.1. HTMLCollection
> **getElementsByTagName, getElementsByClassName** 메소드가 반환하는 HTMLCollection 객체는 노드 객체의 상태 변화를 실시간으로 반영하는 살아 있는(live) DOM 컬렉션 객체이다. 따라서 HTMLCollection 객체를 살아 있는(live) 객체라고 부르기도 한다.

### 3.2. NodeList
> **querySelectorAll** 메소드는 DOM 컬렉션 객체인 **NodeList 객체를 반환**한다. 이때 NodeList 객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는(non-live) 객체이다.

NodeList 객체는 대부분의 경우, 노드 객체의 상태 변경을 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 non-live 객체로 동작한다. 하지만 경우에 따라 HTMLCollection과 같이 실시간으로 노드 객체의 상태 변경을 반영하는 live 객체로 동작할 때가 있다. childNodes 프로퍼티가 반환한 NodeList 객체는 live 객체로 동작하므로 주의가 필요하다.

    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');

        // childNodes 프로퍼티는 NodeList 객체(live)를 반환한다.
        const { childNodes } = $fruits;
        console.log(childNodes instanceof NodeList); // true

        // $fruits 요소의 자식 노드는 5개이다.
        console.log(childNodes); // NodeList(5) [text, li, text, li, text]

        for (let i = 0; i < childNodes.length; i++) {
          // $fruits 요소의 모든 자식 노드를 DOM에서 삭제 ("39.6.9. 노드 삭제" 참고)
          $fruits.removeChild(childNodes[i]); // 첫번째, 세번째 다섯번째만 삭제된다.
        }

        // 예상대로 $fruits 요소의 모든 자식 노드가 삭제되지 않는다.
        console.log(childNodes); // NodeList(2) [li, li]
      </script>
    </html>
따라서 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 배열로 변환하여 사용하는 것을 추천한다. HTMLCollection과 NodeList 객체가 메소드를 제공하기는 하지만 배열의 고차 함수 만큼은 다양한 기능을 제공하지는 않는다. 배열로 변환하면 배열의 유용한 고차 함수(forEach, map, filter, reduce 등)를 사용할 수 있다는 장점도 있다.

HTMLCollection과 NodeList는 모두 유사 배열 객체이자 이터러블이다. 따라서 스프레드 문법을 사용하여 간단히 배열로 변환할 수 있다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li class="apple">apple</li>
        <li class="banana">banana</li>
        <li class="orange">orange</li>
        <li class="melon">melon</li>
      </ul>
      <script>
        const $fruits = document.getElementById('fruits');
        console.log(Object.getOwnPropertyNames(Node.prototype)); // Node
        console.log(Object.getPrototypeOf($fruits)); // HTMLUListElement { }
        
        /** childNodes 프로퍼티는 NodeList(Live)객체를 반환한다. */
        const { childNodes } = $fruits;
        console.log(childNodes.toString()); // [object NodeList]
        
        // NodeList(9) [text, li.apple, text, li.banana, text, li.orange, text, li.melon, text]
        console.log(childNodes);

        [...childNodes].forEach((el)=> $fruits.removeChild(el));

        console.log(childNodes); // NodeList []
      </script>
    </body>
    </html>
## 4. 노드 탐색
>  Node, Element 인터페이스는 트리 탐색 프로퍼티를 제공한다.
DOM 트리를 구성하는 노드로서 갖추어야 할 트리 노드 탐색을 위한 프로퍼티인 parentNode, previousSlibling, firstChild, childNodes 등은 Node.prototype이 제공하고 프로퍼티 키에 Element가 포함된 previousElementSlibling, nextElementSlibling과 children은 Element.prototype이 제공하는 프로퍼티이다.

노드 탐색 프로퍼티는 모두 접근자 프로퍼티이다. 단, setter없이 getter만 존재하여 참조만 가능한 읽기 전용 프로퍼티이다. 읽기 전용 접근자 프로퍼티에 값을 할당하면 아무런 에러없이 무시된다.

### 4.1. 공백텍스트 노드
> HTML 요소 사이의 개행이나 공백은 텍스트 노드를 생성한다.

    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li class="apple">Apple</li>
          <li class="banana">Banana</li>
          <li class="orange">Orange</li>
        </ul>
        <script>
          const $fruits = document.getElementById('fruits');
          const $fruitsItems = $fruits.childNodes;
          /**
          * 자식요소로 공백 텍스트 노드를 가지고있는것을 알수 있다.
          * NodeList(9) [text, li.apple, text, li.banana, text, li.orange, text, li.melon, text]
          */
          console.log($fruitsItems);
        </script>
      </body>
    </html>

### 4.2. 자식노드 탐색
    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li class="apple">apple</li>
        <li class="banana">banana</li>
        <li class="orange">orange</li>
        <li class="melon">melon</li>
      </ul>
      <script>
        const $fruits = document.querySelector('#fruits');
        // const $fruits = document.getElementById('fruits');
        
        console.log($fruits.childNodes); // NodeList 객체를 반환
        console.log($fruits.children); // HTMLCollection 객체를 반환

        // text node또는 element node반환
        console.log($fruits.lastChild); 
        console.log($fruits.firstChild);

        // element node만을 반환 
        console.log($fruits.lastElementChild);
        console.log($fruits.firstElementChild);
      </script>
    </body>
    </html>
### 4.3. 자식노드 존재확인
> 자식 노드의 존재 여부는 불리언 값을 반환하는 Node.prototype.hasChildNodes 메소드로 확인할 수 있다. 단, hasChildNodes 메소드는 childNodes 프로퍼티와 마찬가지로 텍스트 노드를 포함하여 자식 노드의 존재를 확인한다.<br>요소 노드인 자식 노드가 존재하는지는 확인하고 싶은 경우에는 hasChildNodes 메소드 대신 children.length 또는 Element 인터페이스의 childElementCount 프로퍼티를 사용한다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <div class="banana"></div>
      <script>
        const $banana = document.querySelector('.banana');

        // 공백 텍스트노드가 존재 -> true
        console.log($banana.hasChildNodes()); 

        // ParentNode의 children 프로퍼티는 요소노드만을 HTMLCollection으로 반환. 
        console.log(!!$banana.children.length); // false

        // Element 인터페이스의 ChildElementCount프로퍼티로 개수 확인
        console.log(!!$banana.childElementCount); // false
      </script>
    </body>
    </html>
### 4.4. 텍스트노드 탐색
> 요소 노드의 텍스트 노드는 요소 노드의 자식 노드이다. 따라서 요소 노드의 텍스트 노드는 firstChild 프로퍼티로 접근할 수 있다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li class="apple">apple</li>
        <li class="banana">banana</li>
        <li class="orange">orange</li>
        <li class="melon">melon</li>
      </ul>
      <script>
        const $fruits = document.querySelector('#fruits');

        [...$fruits.children].forEach((el) => console.log(el.firstChild));
        console.log($fruits.firstElementChild.firstChild);

        const $fruitsList = document.querySelectorAll('#fruits > li');
        [...$fruitsList].forEach((el) => console.log(el.firstChild));
        console.log($fruitsList);
        console.log($fruitsList[1].firstChild);
        [...$fruitsList].forEach((el) => el.style.color = (el === $fruitsList[$fruitsList.length-1]) ? 'red' : 'blue');
      </script>
    </body>
    </html>
### 4.5. 부모노드 탐색
> 부모 노드를 탐색하기 위해서는 Node.prototype.parentNode 프로퍼티를 사용한다. 텍스트 노드는 DOM 트리의 최종단 노드인 리프 노드(leaf node)이므로 탐색한 부모 노드가 텍스트 노드인 경우는 없다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li class="apple">apple</li>
        <li class="banana">banana</li>
        <li class="orange">orange</li>
        <li class="melon">melon</li>
      </ul>
      <script>
        const $orange = document.querySelector('li + .orange'); // li.orange 노드취득
        console.log($orange.parentNode); // li.orange의 부모노드 취득 : ul#fruits 
      </script>
    </body>
    </html>
### 4.6. 형제노드 탐색
> 같은 부모노드를 가지는 형제노드를 취득하는방법.<br>Node.portotype.previousSibling/nextSibling 과 Element.prototype.previousElementSibling/nextElementSibling 가 있다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li class="apple">apple</li>
        <li class="banana">banana</li>
        <li class="orange">orange</li>
        <li class="melon">melon</li>
      </ul>
      <script>
        const $fruits = document.querySelector('#fruits');
        console.log(Object.getPrototypeOf($fruits));
        const { firstElementChild } = $fruits;
        console.log(firstElementChild);
        const { nextElementSibling } = firstElementChild;
        console.log(nextElementSibling);
        const { previousElementSibling } = nextElementSibling;
        console.log(previousElementSibling);
        const { firstChild } = $fruits;
        console.log(firstChild);
        const { nextSibling } = firstChild;
        console.log(nextSibling);
        const { previousSibling } = nextSibling;
        console.log(previousSibling);
      </script>
    </body>
    </html>
## 5. 노드 정보취득
프로퍼티 | 설명
:---:|:---:
Node.prototype.nodeType	|노드객체의 종류를 나타내는 상수를 반환한다
Node.prototype.nodeName | 노드의 이름을 문자열로 반환한다.

    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello</div>
      </body>
      <script>
        // 문서 노드의 정보
        console.log(document.nodeType); // 9
        console.log(document.nodeName); // #document

        // 요소 노드의 정보
        const $foo = document.getElementById('foo');
        console.log($foo.nodeType); // 1
        console.log($foo.nodeName); // DIV

        // 텍스트 노드의 정보
        const $textNode = $foo.firstChild;
        console.log($textNode.nodeType); // 3
        console.log($textNode.nodeName); // #text
    </script>
    </html>
## 6. 요소 노드의 텍스트 조작
### 6.1. nodeValue
### 6.2. TextContent
## 7. DOM조작
### 7.1 HTML문자열을 파싱하여 DOM노드로 추가
#### 7.1.1. innerHTML 메소드
> Element.prototype.innerHTML 프로퍼티는 getter/setter 모두 존재하는 접근자 프로퍼티이다.<br> 요소노드의 HTML마크업 문자열을 취득하거나 변경할수 있는 프로퍼티이다.

    <!DOCTYPE html>
    <html lang="ko-KR">
    <body>
      <ul id="fruits">
        <li class="apple">apple</li>
        <li class="banana">banana</li>
        <li class="orange">orange</li>
        <li class="melon">melon</li>
      </ul>
      <script>
        const $fruits = document.querySelector('#fruits');
        
        // innerHTML로 마크업요소 취득
        console.log($fruits.innerHTML);

        // 마크업요소 추가
        $fruits.innerHTML += '<li>strawBerry</li>';

        // 마크업요소 갱신
        $fruits.innerHTML = '<li>Hello</li>';

        // 마크업 초기화
        $fruits.innerHTML = '';
      </script>
    </body>
    </html>
#### 7.1.2. innerHTML의 문제점
요소 노드의 innerHTML 프로퍼티에 할당한 HTML 마크업 문자열은 렌더링 엔진에 의해 파싱되어 요소 노드의 자식으로 DOM에 반영된다. 이때 **사용자로부터 입력 받은 데이터(untrusted input data)를 그대로 innerHTML 프로퍼티에 할당하는 것은 크로스 사이트 스크립팅 공격(XSS: Cross-Site Scripting Attacks)에 취약하므로 위험하다.**

**1 .HTML sanitization**<br>
HTML 새니티제이션(HTML sanitization)은 사용자로부터 입력 받은 데이터(untrusted input data)에 의해 발생할 수 있는 크로스 사이트 스크립팅 공격을 예방하기 위해 잠재적 위험을 제거하는 기능을 말한다.<br>새니티제이션 함수를 직접 구현할 수도 있겠지만 DOMPurify 라이브러리를 사용하는 것을 추천한다.
DOMPurify는 아래와 같이 잠재적 위험을 내포한 HTML 마크업을 새니티제이션(살균)하여 잠재적 위험을 제거한다.
```DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // => <img src="x">```
DOMPurify는 2014년 2월부터 제공되기 시작했으므로 어느 정도 안정성이 보장된 새니티제이션 라이브러리라고 할 수 있다.

**2. 기존의 Node를 제거 하고 다시파싱과정을 수행하여 DOM을 변경 (효율성측면에서 문제)**
```
$fruits.innerHTML += '<li class="banana">Banana</li>';
```
위 코드는 아래코드의 축약표현이다.
```
$fruits.innerHTML = $fruits.innerHTML + '<li class="banana">Banana</li>';
// '<li class="apple">Apple</li>' + '<li class="banana">Banana</li>'
```
이처럼 innerHTML 프로퍼티에 HTML 마크업 문자열을 할당하면 유지되어도 좋은 기존의 자식 노드까지 모두 제거하고 다시 처음부터 자식 노드를 생성하여 DOM에 반영한다. 이는 효율적이지 않다.

**3. 새로운 요소를 추가할때 삽입되는 위치를 특정할 수 없음.**
```
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
</ul>
```
li.apple 요소와 li.orange 요소 사이에 새로운 요소를 삽입하고 싶은 경우, innerHTML 프로퍼티를 사용하면 위치를 지정할 수 없다. 이처럼 innerHTML 프로퍼티는 복잡하지 않은 요소를 새롭게 추가할 때 유용하지만 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입해야 할 때는 사용하지 않는 것이 좋다.
#### 7.1.2. insertAdjancentHTML 메소드
> Element.prototype.insertAdjancetnHTML 메소드는 기존요소를 제거하지 않으면서 위치를 지정해서 요소를 삽입한다.

```
Element.prototype.insertAdjancentHTML(position, DOMString)
```
insertAdjacentHTML 메소드는 두번째 인수로 전달한 HTML 마크업 문자열(DOMString)을 파싱하고 그 결과로 생성된 노드를 첫번째 인수로 전달한 위치(position)에 삽입하여 DOM에 반영한다. 첫번째 인수로 전달할 수 있는 문자열은 ‘beforebegin’, ‘afterbegin’, ‘beforeend’, ‘afterend’ 4가지이다.
```
<!DOCTYPE html>
<html>
  <body>
    <!-- beforebegin -->
    <div id="foo">
      <!-- afterbegin -->
      text
      <!-- beforeend -->
    </div>
    <!-- afterend -->
  </body>
  <script>
    const $foo = document.getElementById('foo');

    $foo.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>');
    $foo.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>');
    $foo.insertAdjacentHTML('beforeend', '<p>beforeend</p>');
    $foo.insertAdjacentHTML('afterend', '<p>afterend</p>');
  </script>
</html>
```
insertAdjacentHTML 메소드는 기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 DOM에 반영하므로 기존의 자식 노드를 모두 제거하고 다시 처음부터 자식 노드를 생성하여 DOM에 반영하는 innerHTML 프로퍼티보다 효율적이고 빠르다.

단, innerHTML 프로퍼티와 마찬가지로 insertAdjacentHTML 메소드는 HTML 마크업 문자열을 파싱하므로 크로스 사이트 스크립팅 공격에 취약하다는 점은 동일하다.
### 7.2. 노드를 직접 생성하는 메서드
#### 7.2.1. createElement (요소노드 생성)
> Document.prototype.createElement(tagName) 메소드는 요소 노드를 생성하여 반환한다. createElement 메소드의 매개변수 tagName에는 태그 이름을 나타내는 문자열을 전달한다.

```
// 요소노드 생성
const $li = document.createElement('li');
// 생성된 요소 노드에는 아무런 자식노드가 없다.
console.log($li.childNodes); // NodeList []
```
위 코드를 보면 createElement 메소드로 생성된 요소 노드는 기존 DOM에 추가되지 않고 홀로 존재하는 상태이다. 즉, createElement 메소드는 요소 노드를 생성할 뿐 DOM에 추가하지는 않는다. 따라서 이후에 생성된 요소 노드를 DOM에 추가하는 처리가 별도로 필요하다.

그리고 createElement 메소드로 생성된 요소 노드는 아무런 자식 노드를 가지고 있지 않다. 따라서 요소 노드의 자식 노드인 텍스트 노드도 없는 상태이다.
#### 7.2.2. createTextNode (텍스트 노드 생성)
> Document.prototype.createTextNode(text) 메소드는 텍스트 노드를 생성하여 반환한다. createTextNode 메소드의 매개변수 text에는 텍스트 노드의 값으로 사용될 문자열을 전달한다.

```
const textNode = document.createTextNode('grape');
```
텍스트 노드는 요소 노드의 자식 노드이다. 하지만 createTextNode 메소드로 생성된 텍스트 노드는 요소 노드의 자식 노드로 추가되지 않고 홀로 존재하는 상태이다. 즉, createElement 메소드와 마찬가지로 createTextNode 메소드는 텍스트 노드를 생성할 뿐 요소 노드에 추가하지는 않는다. 따라서 이후에 생성된 텍스트 노드를 요소 노드에 추가하는 처리가 별도로 필요하다.

### 7.3. appendChild 메서드
> Node.prototype.appendChild(childNode) 메소드는 매개변수 childNode에 전달된 노드를 appendChild메서드를 호출한 노드의 마지막 자식 노드로 추가한다.

**1.텍스트 노드를 요소노드의 자식요소로 추가**
```
const $li = document.createElement('li');
const textNode = document.createTextNode('javaScript');
const $listItem = $li.appendChild(textNode);

console.log($li); // <li>javaScript</li>
console.log($listItem); // "javaScript"
```
위 코드를 보면 appendChild 메소드를 통해 요소 노드와 텍스트 노드는 부자 관계로 연결되었지만 아직 기존 DOM에 추가되지는 않은 상태이다.

위 예제처럼 요소 노드에 자식 노드가 하나도 없는 경우에는 텍스트 노드를 생성하여 요소 노드의 자식 노드로 텍스트 노드를 추가하는 것보다 textContent 프로퍼티를 사용하는 편이 보다 간편하다.

```
const $li = document.createElement('li');
const textNode = document.createTextNode('javaScript');

const $listItem = $li.appendChild(textNode);
console.log($li); // <li>javaScript</li>
console.log($listItem); // "javaScript"

$li.textContent = "HTML5";
console.log($li); // <li>HTML5</li>
```
단, textContent 프로퍼티에 문자열을 할당하면 요소 노드의 textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가되므로 주의가 필요하다.

**2. 요소노드를 DOM에 추가**
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <ul id="needs"></ul>
  <script>
    const $li1 = document.createElement('li');
    let textNode = document.createTextNode('javaScript');
    $li1.appendChild(textNode);

    const $li2 = document.createElement('li');
    textNode = document.createTextNode('HTML5');
    $li2.appendChild(textNode);

    // 생성할 노드들을 추가할 기존 DOM노드를 가져온다.
    const $needs = document.querySelector('#needs');

    // 기존DOM노드에 생성한 요소노드를 추가한다.
    $needs.appendChild($li1);
    $needs.appendChild($li2);

    console.log($needs);
  </script>
</body>
</html>
```
이 과정에서 비로소 새롭게 생성한 요소 노드가 DOM에 추가된다. 기존의 DOM에 요소 노드를 추가하는 처리는 이 과정 뿐이다. 위 예제는 단 하나의 요소 노드를 생성하여 DOM에 한번 추가하므로 DOM은 한번 변경된다.

**3. 복수의 노드생성과 추가**
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <ul id="needs"></ul>
  <script>
    const $needs = document.querySelector('#needs');

    ['HTML5', 'CSS3', 'React.js', 'javaScript', 'SASS', 'TypeScript', 'Node.js'].forEach((item) => {
      const $li = document.createElement('li');
      const textNode = document.createTextNode(item);
      $li.appendChild(textNode);
      $needs.appendChild($li);
    });

    console.log($needs);
  </script>
</body>
</html>
```
위 예제는 7개의 요소 노드를 생성하여 DOM에 7번 추가하므로 DOM이 7번 변경된다. DOM을 변경하는 것은 비용이 비싼 처리이므로 가급적 횟수를 줄이는 편이 성능에 유리하다. 따라서 위 예제와 같이 기존 DOM에 요소 노드를 반복하여 추가하는 것은 비효율적이다.
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <ul id="needs"></ul>
  <script>
    const $needs = document.querySelector('#needs');

    // DOM변경을 최소화하기 위해 container 요소를 만들자.
    const $container = document.createElement('div');

    ['HTML5', 'CSS3', 'React.js', 'javaScript', 'SASS', 'TypeScript', 'Node.js'].forEach((item) => {
      const $li = document.createElement('li');
      const textNode = document.createTextNode(item);
      $li.appendChild(textNode);
      $container.appendChild($li);
    });

    // 실질적인 DOM추가는 1번만 발생
    $needs.appendChild($container);
    
    console.log($needs);
  </script>
</body>
</html>
```
위 예제는 DOM을 한번만 변경하여 성능에 유리하기는 하지만 아래와 같이 불필요한 컨테이너 요소(div)가 DOM에 추가되는 부작용이 있다. 이는 바람직하지 않다.

때문에 이를 해결하기 위한방법으로 DocumentFragment 노드를 이용해 해결하는 방법이있다.

**4. DocumentFragment**
> DocumentFragment 노드는 문서, 요소, 어트리뷰트, 텍스트 노드와 같은 노드 객체의 일종으로 부모 노드가 없으며 기존 DOM과는 별도 존재한다는 특징이 있다. DocumentFragment 노드는 위 예제의 컨테이너 요소와 같이 자식 노드들의 부모 노드로서 별도의 서브 DOM을 구성하여 기존 DOM에 추가하기 위한 용도로 사용한다.<br>**DocumentFragment 노드는 기존 DOM과는 별도로 존재하므로 DocumentFragment 노드에 자식 노드를 추가하여도 기존 DOM에는 어떠한 변경도 발생하지 않는다. 또한 DocumentFragment 노드를 DOM에 추가하면 자신의 자식 노드만 DOM에 추가한다.**
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <ul id="needs"></ul>
  <script>
    const $needs = document.querySelector('#needs');

    // 비어있는 fragment 노드를 생성한다.
    const $fragment = document.createDocumentFragment();

    ['HTML5', 'CSS3', 'React.js', 'javaScript', 'SASS', 'TypeScript', 'Node.js'].forEach((item) => {
      const $li = document.createElement('li');
      const textNode = document.createTextNode(item);
      $li.appendChild(textNode);
      $fragment.appendChild($li);
    });

    /**fragment노드를 DOM에 추가함으로써 
     * 불필요한 container 요소가 추가되지않음 
     * */
    $needs.appendChild($fragment);
    
    console.log($needs);
  </script>
</body>
</html>
```
먼저 DocumentFragment 노드를 생성하고 DOM에 추가할 요소 노드를 DocumentFragment 노드에 자식 노드로 추가한 다음, DocumentFragment 노드를 기존 DOM에 추가한다.

이때 실제로 DOM 변경이 발생하는 것은 DocumentFragment 노드를 DOM에 추가하는 한번 뿐이다. 따라서 여러 개의 요소 노드를 DOM에 추가하는 경우, DocumentFragment 노드를 사용하는 것이 보다 효율적이다.
### 7.4. insertBefore 메서드
> Node.prototype.insertBefore(newNode, childNode) 메서드는 첫번째 인수로 전달받은 노드를 두번째 인수로 전달받은 노드앞에 삽입한다.

```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');

    const $li = document.createElement('li');

    // 생성된 li Element에 textNode를 자식요소로 추가
    $li.appendChild(document.createTextNode('strawBerry'));
    
    // $li 요소를 $fruits요소의 마지막요소의 앞부분에 요소추가
    $fruits.insertBefore($li, $fruits.firstChild);

    /**기존 $fruits.firstChild의 앞부부분에
     * 생성한 li 요소가 추가된것을 확인.
    */
    console.log($fruits.children);
  </script>
</body>
</html>
```
#### 7.4.1. 주의사항
두번째 인수로 전달받은 노드는 반드시 insertBefore 메소드를 호출한 노드의 자식 노드이어야 한다. 그렇지 않으면 DOMException 에러가 발생한다.
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <div id="foo"></div>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');

    const $li = document.createElement('li');

    // 생성된 li Element에 textNode를 자식요소로 추가
    $li.appendChild(document.createTextNode('strawBerry'));
    
    // 두번째 인수를 자식요소가 아닌 다른요소를 추가.
    $fruits.insertBefore($li, document.querySelector('#foo'));
    // DOMException Error
  </script>
</body>
</html>
```
두번째 인수로 전달받은 노드가 null이면 insertBefore 메소드를 호출한 노드의 마지막 자식 노드로 추가된다. 즉, appendChild 메소드처럼 동작한다.
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <div id="foo"></div>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');

    const $li = document.createElement('li');

    // 생성된 li Element에 textNode를 자식요소로 추가
    $li.appendChild(document.createTextNode('strawBerry'));
    
    // 두번째 인수를 null추가
    $fruits.insertBefore($li, null);

    // appendChild 메서드 처럼 마지막에 요소추가
    console.log($fruits);
  </script>
</body>
</html>
```
### 7.5. 노드 이동(appendChild, insertBefore)
> DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메소드를 사용하여 DOM에 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. 즉, 노드가 이동한다.

```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <div id="foo"></div>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');

    console.log($fruits.children); // HTMLCollection

    console.log(Object.getPrototypeOf($fruits));

    // 배열형태의 HTMLCollection 구조분해 할당.
    const [ $apple, $banana, $orange ] = $fruits.children;

    // 기존에 존재하던 요소를 appendChild로 마지막위치로 자리바꿈
    $fruits.appendChild($apple);
    console.log($fruits); // banana, orange, melon, apple

    // 기존요소를 insertBefore을 이용해 위치바꿈.
    $fruits.insertBefore($banana, $fruits.lastElementChild);
    console.log($fruits); // orange, melon, banana, apple
  </script>
</body>
</html>
```
### 7.6. cloneNode 메서드 (노드 복사)
> Node.prototype.cloneNode([deep: true | false]) 메서드는 자신의 사본을 생성하여 반환한다. 매개변수 deep에 true를 전달하면 노드 자신을 깊은복사(deep copy)하여 모든 자손노드가 포함된 사본을 생성하고, false를 전달하거나 생략하면 노드자신을 얕은 복사(shallow copy)하여 노드 자신만의 사본을 복사한다.
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <div id="foo"></div>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');
    const $apple = $fruits.firstElementChild;

    // 얕은 복사로인해 textNode는 복사되지 않는다
    const shallowCopy =$apple.cloneNode();

    // textNode를 추가해준다.
    shallowCopy.textContent = 'apple';

    // 복사본을 DOM에 추가.
    $fruits.appendChild(shallowCopy);

    console.log($fruits); // apple - banana - orange - melon - apple

    // $apple 다음의 형제요소를 취득
    const $banana = $apple.nextElementSibling;

    // $banana를 깊은복사하고 DOM에 추가
    const deepCopy = $banana.cloneNode(true);
    $fruits.appendChild(deepCopy);

    console.log($fruits); // apple - banana - orange - melon - apple - banana
  </script>
</body>
</html>
```
### 7.7. replaceChild 메서드 (노드 교체)
> Node.prototype.replaceChild(newChild, oldChild) 메서드는 자신을 호출한 노드의 자식노드를 다른 노드로 교체한다. 첫번째 매개변수 newChild에는 교체할 새로운 노드를 전달하고, 두번째 매개변수 oldChild에는 이미존재하는 교체될 노드를 전달한다. 매개변수 oldChild에게 전달한 노드는 replaceChild 메소드를 호출한 노드의 자식노드여야 한다.

```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <div id="foo"></div>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');
    const $orange = $fruits.querySelector('.orange');

    // 새로추가할 요소를 만들고 textNode까지 자식요소로 추가
    const $li = document.createElement('li');
    $li.textContent = 'strawBerry';

    // $fruits의 자식요소를 새로운 요소로 교체
    $fruits.replaceChild($li, $orange);

    console.log($fruits); // apple - banana - strawBerry - melon
  </script>
</body>
</html>
```
### 7.8. removeChild 메서드 (노드 삭제)
> Node.prototype.removeChild(child) 메서드는 매개변수 child에 전달한 노드를 DOM에서 삭제한다. 매개변수 child에게 전달한 노드는 removeChild 메서드를 호출한 노드의 자식노드여야 한다.

```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <div id="foo"></div>
  <ul id="fruits">
    <li class="apple">apple</li>
    <li class="banana">banana</li>
    <li class="orange">orange</li>
    <li class="melon">melon</li>
  </ul>
  <script>
    const $fruits = document.querySelector('#fruits');
    const $banana = $fruits.firstElementChild.nextElementSibling;

    $fruits.removeChild($banana);
    console.log($fruits); // apple - orange - melon
  </script>
</body>
</html>
```
## 8. 어트리뷰트
```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <input id="user" type="text" value="lki"></input>
  <script>
    const $input = document.querySelector('input');
    console.log($input);
    const $attr = $input.attributes; // or const { attributes } = $input;
    console.log($attr); // NamedNodeMap {0: id, 1: type, 2: value, id: id, type: type, value: value, length: 3}

    // 취득한 attributes 값을 console.log로 확인.
    [...$attr].forEach((el) => console.log(el)); // id="user" type="text" value="lki"
    [...$attr].forEach((el) => console.log(el.value)); // user text lik
  </script>
</body>
</html>
```
HTML 문서가 파싱될 때, HTML 요소의 어트리뷰트(HTML 어트리뷰트)는 어트리뷰트 노드로 변환되어 요소 노드 객체의 형제 노드로 추가된다. 이때 HTML 어트리뷰트 당 하나의 어트리뷰트 노드가 생성된다. 즉, 위 input 요소는 3개의 어트리뷰트가 있으므로 3개의 어트리뷰트 노드가 생성된다.

이때 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 NamedNodeMap 객체에 담겨서 요소 노드의 arrtibutes 프로퍼티에 저장된다.

따라서 요소 노드의 모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있다. attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이며 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환한다.

### 8.1. HTML 어트리뷰트 조작
앞에서 살펴본 바와 같이 요소 노드의 attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이므로 HTML 어트리뷰트 값을 취득할 수 있지만 변경은 할 수 없다. 또한 attributes 프로퍼티를 통해야만 HTML 어트리뷰트 값을 취득할 수 있기 때문에 불편하다.

Element.prototype.getAttribute/getAttribute 메소드를 사용하면 attributes 프로퍼티를 통하지 않고 요소 노드에서 메소드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경할 수 있어서 편리하다.

HTML 어트리뷰트 값을 참조하려면 Element.prototype.getAttribute(attributeName) 메소드를 사용하고 HTML 어트리뷰트 값을 변경하려면 Element.prototype.setAttribute(attributeName, attributeValue) 메소드를 사용한다.

```
<!DOCTYPE html>
<html lang="ko-KR">
<body>
  <input id="user" type="text" value="lki"></input>
  <script>
    const $input = document.querySelector('input');

    // 요소의 value attribute의 값을 읽기.
    let inputValue = $input.getAttribute('value');
    console.log(inputValue);

    // 요소의 value attribute값을 foo로 변경하기
    $input.setAttribute('value', 'foo');
    inputValue = $input.getAttribute('value');
    console.log(inputValue);
  </script>
</body>
</html>
```
## 9. 스타일
## 10. DOM표준