# REST API

## 1. REST API의 구성

REST API는 자원(resource), 행위(Verb), 표현(Representations)의 3가지 요소로 구성된다. REST는 자체 표현 구조(Self-descriptiveness)로 구성되어 REST API만으로 요청을 이해할 수 있다.

| 구성요소              | 내용                           | 표현 방법        |
| :-------------------- | :----------------------------- | :--------------- |
| 자원(Resource)        | 자원                           | HTTP URI         |
| 행위(Verb)            | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현(Representations) | 자원에 대한 행위의 구체적 내용 | HTTP 페이로드    |

## 2. REST API의 설계방침

REST에서 가장 중요한 기본규칙은 두 가지이다. URI는 리소스를 표현하는 데에 집중하고 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것이 REST한 API를 설계하는 중심 규칙이다.

1. URI는 리소스를 표현해야 한다.

   리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다. URI는 리소스를 표현하는데 중점을 두어야 한다. 리소스 이름에 get 같은 행위에 대한 표현이 들어가서는 안된다.

```code
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

1. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.  
   리소스를

## 3. JSON Server를 사용한 REST API 실습

### 3.1. JSON Server 설치

### 3.2. db.json 파일 생성

### 3.3. JSON Server 실행

### 3.4. GET 요청

### 3.5. POST 요청

### 3.6. PUT 요청

### 3.7. PATCH 요청

### 3.8. DELETE 요청
