## NPM

NPM(Node Package Manager)는 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저입니다. NPM 공식 사이트에서도 안내가 되어 있지만 전 세계 자바스크립트 개발자들이 모두 자바스크립트 라이브러리를 공개된 저장소에 올려놓고 npm 명령어로 편하게 다운로드 받을 수 있습니다.  
ex) express, TensorFolow.js

### NPM 설치명령어

#### NPM 지역설치

NPM 초기화 명령어로 package.json 파일을 생성하고 나면 해당 프로젝트에서 사용할 자바스크립트 라이브러리를 설치하게된다. 이때 명령어는 아래와 같다.

```sh
$npm install (설치하고자하는 라이브러리이름) --save-prod
```

그리고 지역 설치 명령어의 경우 명령어 옵션으로 `--save-prod`를 붙이지 않아도 동일한 효과가 난다. 또한, install 대신 i를 사용해도 된다.

```sh
# 위 명령어와 동일한 효과
$npm i (설치하고자하는 라이브러리이름)
```

#### NPM 지역설치 경로

위 명령어로 라이브러리를 설치하면 해당 프로젝트의 `node_modules` 라는 폴더가 생긴다. 그리고 그 폴더 아래에 해당 라이브러리 파일들이 설치되어 있는 것을 확인할 수 있다.

#### NPM 전역설치

NPM 전역 설치는 위와 같이 프로젝트에서 사용할 라이브러리를 불러올때 사용하는 것이 아니라 시스템 레벨에서 사용할 자바스크립트 라이브러리를 설치할때 사용한다.

```sh
$npm install gulp --global
```

라이브러리가 설치되고 나면 이제 명령어 실행 창에 해당 라이브러리 이름을 입력했을 때 명령어를 인식한다.

```sh
$gulp
```

전역설치를 할때 --global 옵션대신 -g를 사용해도 된다.

#### NPM 전역설치 경로

전역으로 설치된 NPM 라이브러리는 어느 위치에서 해당명령어를 실행했던지 간에 OS별로 아래와 같은 폴더경로에 설치된다.

```
# window
%USERPROFILE%\AppData\Roaming\npm\node_modules

# mac
/usr/local/lib/node_modules
```

#### NPM 지역설치 옵션 2가지

NPM지역설치에 자주 사용되는 옵션 2가지는 아래와 같다.

```sh
$npm install (설치하고자하는 라이브러리이름) --save-prod
$npm install (설치하고자하는 라이브러리이름) --save-dev
```

위 명령어는 아래와 같이 축약해서 사용할 수 있다.

```sh
$npm i (설치하고자하는 라이브러리이름)
$npm i (설치하고자하는 라이브러리이름) -D
```

여기서 설치옵션에 아무것도 넣지않은 `npm i (설치하고자하는 라이브러리이름)`는 `package.json`의 `dependencies`에 등록된다.

설치 옵션으로 `-D`를 넣은 경우는 해당 라이브러리가 `package.json`의 `devDependencies`에 등록이 된다.

옵션으로 `-D`를 주었을 때와 주지 않았을 때의 차이점은 무엇일까?

NPM 지역 설치를 할 때는 해당 라이브러리가 배포용(dependencies)인지 개발용(devDependencies)인지 꼭 구분해주어야 한다. 예를 들어, jquery와 같이 화면 로직과 직접적으로 관련된 라이브러리는 배포용으로 설치해야 한다.(`-D` 옵션을 주지 않는다.)

이렇게 설치된 배포용 라이브러리는 npm run build로 빌드를 하면 최종 애플리케이션 코드 안에 포함된다.

그런데 만약 반대로 설치 옵션에 `-D`를 주었다면 해당 라이브러리는 빌드하고 배포할 때 애플리케이션 코드에서 빠지게 된다. 따라서, 최종 애플리케이션에 포함되어야 하는 라이브러리는 `-D`로 설치하면 안된다.

### NPM Custom Commands

#### NPM 커스텀 명령어

NPM 커스텀 명령어란 사용자가 임의로 명령어의 이름과 동작을 정의해서 사용할 수 있는 기능을 의미한다.

```json
// package.json
{
  ...
  "scripts": {
    "hello": "echo hi"
  }
}
```

NPM 패키지 관리파일인 package.json에 위와 같이 `scripts`라는 속성을 추가할 수 있다. 그리고 아래의 명령어를 실해하면 콘솔에 *hi*가 출력된다.

```sh
$npm run hello
```

이처럼 명령어 실행 창에 매번 긴 명령어를 입력할 필요 없이 커스텀 명령어를 이용해 원하는 동작을 실행 할 수 있다.

NPM 커스텀 명령어는 모두 `npm run 명령어 이름` 형식으로 실행 할 수 있다.

#### NPM 커스텀 명령어 실제사례

NPM 커스텀 명령어는 웹팩 같은 도구 뿐만 아니라 Node.js등을 사용할 때도 유용하다.

```json
"scripts": {
  "dev": "node server.js",
  "build": "webpack --mode=none",
}
```

위 코드는 서버를 실행하는 `dev`명령어와 웹팩으로 빌드하는 `build` 명령어를 정의한 코드이다. 사용자는 매번 `node server.js`와 `webpack --mode-none`를 칠 필요없이 `npm run dev`와 `npm run build`를 입력하면 된다.

아래와 같이 실행하려는 명령어가 길수록 더 빛을 발한다.

```json
"scripts": {
  "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
}
```

#### NPM 커스텀 명령어 실전활용

커스텀 명령어의 또 다른 장점은 해당 명령어에 실행 옵션 뿐만 아니라 다른 커스텀 명령어를 조합할 수 있다는 점이다.

```json
"scripts": {
  "build": "webpack",
  "deploy": "npm run build -- --mode production"
}
```

위와 같은 `scripts`속성을 정의하고 명령어를 입력하면 어떻게 될까?

```sh
$npm run deploy
```

먼저 빌드에 정의된 `webpack`명령어가 실행되면서 명령어 뒤쪽에 붙은 실행 옵션들이 수행된다.
