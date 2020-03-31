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
### 7.1 HTML문자열을 파싱하여 DOM노드 추가
#### 7.1.1. innerHTML
#### 7.1.2. TextContent
### 7.2. 노드를 직접 생성하는 메서드
#### 7.2.1. createElement (요소노드 생성)
#### 7.2.2. createTextNode (텍스트 노드 생성)
### 7.3. appendChild 메서드
1. 텍스트 노드를 요소노드의 자식요소로 추가
1. 요소노드를 DOM에 추가
1. 복수의 노드생성과 추가
1. DocumentFragment
### 7.4. insertBefore 메서드
### 7.5 노드 이동(appendChild, insertBefore)
### 7.6. cloneNode 메서드 (노드 복사)
### 7.7. replaceChild 메서드 (노드 교체)
### 7.8. removeChild 메서드 (노드 삭제)
## 8. 어트리뷰트
## 9. 스타일
## 10. DOM표준