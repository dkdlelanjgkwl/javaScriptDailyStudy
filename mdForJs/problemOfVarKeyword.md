# 전역변수의 문제점
## 1. 변수의 생명주기
### 1.1. 지역변수의 생명주기
    const local = function(){
      const dotax = 'local function foo';
      console.log(dotax);
      return dotax;
    }
    local();
    console.log(dotax); // dotax is not defined
- 
### 1.2. 전역변수의 생명주기
## 2. 전역변수의 문제점
## 3. 전역변수 사용 억제방법
### 3.1. 즉시실행 함수
### 3.2. 네임스페이스 객체
### 3.3. 모듈 패턴
### 3.4. ES6 모듈