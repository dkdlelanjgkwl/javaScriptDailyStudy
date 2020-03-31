# 배열 메서드 종류
## 1. static method
- **Array.from()**<br><br>
1번째 매개변수 : arrayLike<br><br>
배열로 변환하고자하는 유사배열 객체나 반복가능한 객체<br><br>
2번재 매개변수(optional) : mapFn<br><br>
3번쨰 매개변수(optional) : this바인딩할 객체<br>

      function generateSquences(length = 0) {
        return Array.from(new Array(length), (v, i) => i * 2);
      }
      console.log(generateSquences(10));

      const generate = (startIdx = 0, endIdx, step = 1) =>
      Array.from({ length: (endIdx - startIdx) / step + 1 },
      (v, i) => startIdx + i * step);
      console.log(generate(50, 100, 3));
- **Array.isArray()**<br><br>
매개변수로 들어오는 값이 array 객체면 true 아니면 false반환
## 2. prototype method
### 2.1. 변경자 메서드
> 변경자 메서드 사용시 원본배열이 변경된다.
- **push**<br><br>
배열의 끝에 하나 이상의 요소를 추가하고, 변경된 배열의 길이를 반환합니다.
- **pop**<br><br>

- **reverse**<br><br>
- **shift**<br><br>
- **unshift**<br><br>
- **sort**<br><br>

- **array.splice**<br><br>
배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경합니다.<br><br>
1번째 매개변수 : start <br> 배열의 변경을 시작할 인덱스 번호. 양수이면서 배열의 길이보다 큰경우는 자동으로 배열의 length값으로 설정됨.<br>
음수일 경우 배열의 끝에서부터 요소를 검색한다. 음수이면서 절대값이 배열의 길이보다 길다면 자동으로 0번째 인덱스로 설정됨.<br><br>
2번째 매개변수 : deleteCount (optional) <br> 배열에서 제거할 요소의 수. 만약 값을 생략하거나 array.length - start 보다 크면 start 부터 모든 요소를 제거한다.<br><br>
3번째 매개변수 : items1, items2, ... (optional)<br>
배열에 추가할 요소. 아무 요소도 지정하지 않으면 splice는 요소를 제거하기만 함.<br>


      const month = ['Jan', 'March', 'April'];
      month.splice(1, 0, 'Feb');
      console.log(month); // [ 'Jan', 'Feb', 'March', 'April' ]

      /**
      * 0번 인덱스에서 두 개 요소 제거하고 제거된 자리에 'May', 'Jun', 'July' 추가
      */
      month.splice(0, 2, 'May', 'Jun', 'July');
      console.log(month); // [ 'May', 'Jun', 'July', 'March', 'April' ]

      /**
      * 제거 하지않고 3번인덱스에 추가
      */
      month.splice(3, 0, 'Agust', 'October');
      console.log(month);

      /**
      * 2번 인덱스에서 두개 요소 제거
      */
      month.splice(2, 2);
      console.log(month);

      /**
      * 제일 뒤에 2개요소 제거
      */
      month.splice(-2, 2); // month.splice(month.length - 2, 2);와 같음.
      console.log(month);
- **fill**<br><br>

### 2.2. 접근자 메서드
> 원본배열에 접근하여 작업을 수행하고 새로운 배열이나 값을 리턴한다.

- **concat**<br><br>
- **array.filter (need callbackFn prameter)**<br><br>
주어진 콜백함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합.<br><br>
1. filter 매개변수 <br><br> 
1번째: callbackFn<br><br>
2번째 (optional) : 화살표함수 미사용시 this바인딩할 객체<br><br>
1. callbackFn 매개변수 <br><br>
1번째: 배열을 지정해줫을때 배열value값 매핑할 변수<br><br>
2번째: 지정할 배열의 index와 매핑되는 변수<br><br>
3번째: 배열을 지정하지 않았을때 매개변수로 배열 매핑<br>

        const creatArray = (length = 0) => Array.from(new Array(length), (v, i) => i);
        let newArr = creatArray(20);
        console.log(newArr);

        /**
        * filter로 홀수만 골라내기
        */
        const newArr1 = newArr.filter((v) => (v % 2 === 1));
        console.log(newArr1);

        // 1.요소값 2.요소 인덱스 3.순회되는 배열객체

        /**
        * 쿼리 조건에따른 배열검색
        */
        const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
        const selectQuery = (array123, query) => array123.filter((el) => el.toLowerCase().includes(query.toLowerCase()));

        console.log(selectQuery(fruits, 'aP')); // [ 'apple', 'grapes' ]
        console.log(selectQuery(fruits, 'AN')); // [ 'banana', 'mango', 'orange' ]
        console.log(selectQuery(fruits, 'o')); // [ 'mango', 'orange' ]
        console.log(selectQuery(fruits, 'G')); // [ 'grapes', 'mango', 'orange' ]


        /**
        * value 값이 숫자가 아닌거골라내기. isNan module 배열안에 객체가 요소로존재
        * 하기 때문에 값을 체크하는 모듈은 object를 기준으로.
        */

        // json 객체
        const arr22 = [
          { id: 15 },
          { id: -1 },
          { id: 0 },
          { id: 3 },
          { id: 12.2 },
          { },
          { id: null },
          { id: NaN },
          { id: 'undefined' }
        ];

        // filter로 순회하는 요소에서 type check
        const isNaN = (obj) => obj !== undefined && typeof (obj) === 'number' && !Number.isNaN(obj);

        // isNaN 모듈을 이용해서 fillter로 새로운배열 만들어서 리턴하기.
        const sortedJson = (array) => {
          return array.filter((el) => isNaN(el.id) === true);
        };

        console.log(sortedJson(arr22));
        // [ { id: 15 }, { id: -1 }, { id: 0 }, { id: 3 }, { id: 12.2 } ]
- **includes**<br><br>
- **indexOf**<br><br>
- **join**<br><br>
- **slice**<br><br>

### 2.3. 순회 메서드
> 배열을 순회하면서 콜백함수를 호출하여 작업을 수행함.<br> 이러한 메서드를 호출할때는 호출시점의 배열의 length값을 기억하고 있기때문에 순회가 끝나지 않았을 경우에 요소를 더 추가하게되면 콜백함수가 추가된 요소에대한 작업을 수행하지 않는다.<br> 순회메서드를 사용하면서 원본배열을 변경해야할 경우에는 새로운배열로 복사하여 작업을 처리하는것을 추천.

- **entries  (dont need callback prameter)**<br><br>
- **keys (dont need callback prameter)**<br><br>
- **values (dont need callback prameter)**<br><br>
- **every**<br><br>
- **find**<br><br>
- **forEach**<br><br>
- **arr.map**<br><br>

- **reduce**<br><br>
- **some**<br><br>