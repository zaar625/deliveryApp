### 기본 프로젝트 구조와 index.js

- RN에서 파일의 시작점은 index.js이다.
- expo는 커스터마이징하기가 어렵기 떄문에 cli로 개발하는 사람이 많은 편
- ios 기준으로 개발을 진행할 것 -> android와 ios UI 차이가 있어 ios를 먼저 하는 것이 수정이 적음
- react-native 에서 굳이 styled-component를 사용할 이유가 없다.

### 리액트 네이티브 기본 컴포넌트 분석

- 코드를 분석할 때에는 마지막 export default 부분부터 클릭하여 이동하면서 확인한다.
- 다크모드 지원 useColorSheme() 훅을 이용한다.
- 리액트와 다르다. 같은것을 찾자면 비지니스 로직정도이다.
- 스타일을 인라인 스타일 보다 StyleSheet.create() 를 사용하는 것이 더 효율적이며 성능면에서 좋다.(드라마틱하진 않다.)
- 스타일에 변수가 들어가는 경우는 인라인 스타일로 한다.
- react-native-status-bar-height 상태 바 높이 라이브러리
- 내용들이 수백개 수천개 일경우 scrollView를 사용하지 않도록 한다. 성능면에서 좋지 않기 때문에 FlatList를 사용한다.
- 하나의 파일 안에 두개이상의 컴포넌트를 넣는 것은 좋은 코딩 스타일이 아니다. 파일을 분리시킬 것.

### 데브메뉴와 Fliper

- 관련 라이브러리들이 굉장히 많다. 하지만 잘 돌아가지 않는 라이브러리도 있기 때문에 그럴경우 해당 라이브러리를 까서 수정하면서 진행해야 하는 경우도 있다.
- fetchpakage를 이용하여 고친다 추후에 소개함.
- web 디버그모드 -> 굉장히 불편하다. API를 사용할 때 네트워크 요청 같은 것들은 전혀 안뜬다.
- 모바일에서 디버그 모드가 힘들므로, Flipper 사이트에서 다운로드하여 사용한다. 다만 설치 후 잔 에러가 많아서 초보자들이 사용하기 힘든 경우가 있으니 참고하자.
  - 레이어가 복잡하고, 서비스가 고도화 될 경우 필히 사용해야하니 한번 쯤 미리 사용해보는 것도 좋다.
  - Flipper에서 추천하는 플러그인 1. flipper-plugin-redux-debugger, 2. flipper-plugin-async-storage
- Q. npm i ~~ --force 는 뭐지?

### 앱 이름 바꾸기, 강좌 폴더 구조 잡기

- app.json에서 name을 바꾸려는 이유. -> 배포를 하려고 하는데 누군가가 해당 이름을 사용하고 있을 경우
- 네이티브 관련된 모듈은 modules 폴더에 넣는다.

### 리액트 내비게이션 사용해보기

- https://reactnavigation.org/docs/screen의 children 내용 보기
- 네비게이터 사용 시 스크린 설계를 어떻게 해야 할지 고민을 하고 작성한다.

### flex와 요소 배치

- 타입스크립트는 간략히 말하자면 매개변수,변수,리턴 값을 어떤 타입을 가졌는지 미리 확정하는 것.
- touchableHighlight
- flex: 비율, justifyContent:'center' 세로기준 중앙정렬, alignItems: 가로 기준 중앙 정렬

### 리액트 내비게이션 화면 전환하기

```
<Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
</Stack.Screen>
```

위 코드에서 props에 마우스를 올려보면 props 타입을 확인할수 있다. 필수인 route와 navigation이 필요하다는 것.
일반적으로 인라인으로 작성할 경우 자동으로 props를 내려준다.

### 라우트 params와 헤더 옵션들

- navigate VS push의 차이점: navigate의 경우 새로 이동할 화면이 현재 화면과 같으면 새로운 화면을 쌓지 않고 파라미터만 변경.
  - 따라서 화면 전환효과도 없고 뒤로 가기를 눌렀을 때 스택으로 쌓지 않기 때문에 처음 진입화면으로 돌아간다.
- push는 정반대
- 네비게이터로 params를 보낼 경우 유저아이디 같은 간단한 파라미터만 보내고, 복잡한 객체의 경우 글로벌 스토어로 관리한다.

### 보너스 relative, absolute 모달 그리기

- 모달의 경우 가장 위에 있는 스크린이기 때문에 component는 맨 하단으로 보내져야 한다. 위로 쌓이기 때문.

  ```
  <NavigationContainer>
    <Tab.Navigator>...</Tab.Navigator> // 기본적으로 flex:1이 적용되어 있다.
    // 만약 여기에 flex:1을 적용할 경우 반반을 차지할 것이다. -> position absolute로 적용하면 맨위로 올라온다.
    // 마지만 아래 뷰컴포넌트를 Navigator 보다 먼저 올릴 경우 Hello는 보이지 않는다.
    // right: 0, left: 0 일 경우 하나의 블럭처럼 된다.(원래는 자기 크기만큼)
    <View><Text>Hello</Text></View>
  </NavigationContainer>
  //---------------------------------------------
   <NavigationContainer>
    <Tab.Navigator>...</Tab.Navigator> // 기본적으로 flex:1이 적용되어 있다.

    //opacity 값을 줘서 뒤에 영역은 보이지만 사용자가 클릭하지 못하게 하는 방법.
    //만약 위치값 각각에 20씩 넣을 경우 작은 사각형이 형성된다.
    <View style={{position:'absolute', top:0, left:0, bottom:0, right: 0 ,backgroundColor:'rgba(0,0,0,0.8)'}}>
      <Text>Hello</Text>
    </View>
  </NavigationContainer>
  ```

  - 자기위치에서 위치만 변경하고 싶다면 relative를 사용한다.
  - zIndex는 될 수있으면 사용하지 않도록 한다. 스택으로 쌓이기 때문에 나중에 흐름이 엉킬 수 있다.

### 앱 라우터 구성하기

-

### 스크린과 중첩 라우팅

- 최근 화살표함수보다 일반 선언함수로 많이 작성한다.
- 추후 맵스택 위에 완료 처리 스택을 쌓을 것이다. 그리고 완료가 되면 완료 스택을 제거하는 방식으로 진행을 할 것인데 그 이유는 맵의 경우 로딩 속도가
  느리며, 폰 성능으로 인해 사용자가 불편할 수 있고, 굳이 API를 계속해서 날릴 필요가 없음.
- 중첩으로 스택을 쌓을 수 있기 때문에 초반에 잘 설계를 해둘 것.
- 모든 페이지가 쌓여있으면 메모리가 많이 차지하기 때문에 때론 스택을 일부로 비우는 경우도 있다.

### 로그인 화면 만들기

- 조건문을 사용했을 떄 children이 반드시 하나여야한다 라는 에어문구가 나올 경우 Tab.group을 사용한다. || 특정 스크린들 간에 공통 속성이 있을 때도 사용. - 찾아볼 것.
- style을 인라인으로 여러개를 넣을 때 배열로 하는 방법이 있고, StyleSheet.compose(styles.loign, styles.logout) 이렇게 작성하여도 된다.
- 변수명은 딱봐도 알 수 있도록 네임을 써야하고, 코드가 깔끔하다는건 무조건적인 줄임이 아니라, 이해가 잘 되도록 작성하는것이 깔끔한 것이다.
- StyleSheet.hairlineSheet

### TextInput 사용하기

- importantForAutofill - 안드로이드만 가능하다.
- autoComplete
- 키보드 next를 눌렀을 떄 다음 버튼으로 이동하기.
- blurOnSubmit : 이메일을 입력하고 다음을 누르면 키보드가 사라지고, 다시 패스워드에 포커스가 되면 키보드가 올라가는데 사용자 입장에서는 굳이? 따라서 해당 메서드는 키보드를 아래로 내려가는 것을 방지한다.

```
 onSubmitEditing = {() => { passwordRef.current?.focus();}} // 엔터 쳤을 때 할 행동
```

```
 keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
```

에서 ascii-capable : 영문만 표시되는 키보드

- clearButtonMode : x 표시가 나타나며 해당 아이콘을 클릭할 경우 작성한 글자는 사라짐 - ios만 가능
- input 검증을 할 경우 띄어쓰기를 조심하자. 띄어쓰기 또한 글자이다.

### 회원가입과 Keyboard, KeyboardAvoidingView

- DissmissKeyboardView.tsx 파일 잘 보기.
- TouchableWidthoutFeedback 에서 accessible={false} 속성이 있다. 이는 시각적으로 불편한 사람을 위한 속성인데, 스크린리더는 해당 태그를 버튼으로 인식한다. 하지만 이 태그는 의미없는 태그이기 때문에
  오히려 시각 장애인에게 혼란을 줄 수 있다.

### keyboard-aware-scrollView의 커스텀 타이핑

- keyboard-aware-scrollView 라이브러리를 이용해보자.
  - 근데 이건 사용할 필요가 없는데, 해당 화면을 스크롤 뷰로 하면 되자나.

```
const DissmissView : React.FC<props 타입 자리> = ({children}) => (<View>{children}</View>) // 이렇게 화살표 함수를 사용할 경우 children props 타입을 지정해줘야 할때 React.FC 타입을 작성해준다.
```

- 옛날 라이브러리들은 타입스트립트가 없는 경우가 있다. 이럴 경우 타입에러가 발생한다. -> 타입스크립트에서 해당 라이브러리 타입이 있는지 확인해야한다.
- 그래도 없을 경우 types 폴더 내에 내가 작성해야 한다. -> 현재 강의에서는 import keyboardAwareScrollView 를 하고 해당 타입이 어떻게 되어있는지 응용하여 작성된 것이다.

### 리덕스 연결하기

- 리덕스 툴킷 설치
- store - index.ts 파일내에 미들웨어는 flipper과 연결하기 위해 코드 작성된 것
- useSelector 는 provider 내에서만 사용 가능하다. -> App inner 컴포넌트로 분리한다.

### axios로 서버에 요청보내기

- 서버요청은 axios 사용하지만 최근 ky와 got 으로 넘어가는 추세. axios 보다 가벼움. 하지만 react-native는 안정적이 않고 레퍼런스가 적어서 아직은 잘 사용하지 않음.
- try catch finally문
- useEffect 콜백함수에 async를 사용할 수 없다. useEffect의 리던 값은 return () => {} 이라는 클리어 함수 이기 때문이다.

### 로딩창 만들기

- 서버에 요청을 보낼때 사용자가 파악할 수 있도록 로딩창을 만들어 준다.
- await인 경우 데이터가 받오는 동안 대기를 한다.
- axios를 사용할 때 error 타입에 에러가 발생할 것이다. error = unknown(어떤 에러가 나든 catch에서 다 걸러버리기 때문에 타입스크립트는 에러를 파악할 수 있다.)
  - 따라서 axios 에러를 단언시켜 준다.

```
catch(error){
  console.error((error as AxiosError).response);
  if((error as AxiosError).response){
    ....
  }
}
```

- 위 코드와 같이 타입 단언은 계속 해주어야 한다. -> 지저분하다 -> 변수로 지정해서 사용하도록 한다.

```
disabled = {!canGoNext || loading}
```

- 로딩 중 일때 유저가 회원가입 버튼을 누르지 못하게 하도록 한다. (사용자가 계속 누를 수도 있음.)
- ActivityIndicator
- axios의 헤더는 요청에 대한 부가 정보라고 생각하자.

### react-native-config

- 서버를 사용할 때 개발시/ 배포시 경우에 따라 주소를 분기처리해야한다.
- 방법1.

```
-- 일반적?인 경우
const response = await axios.post(
  url:`${process.env.NODE_ENV === 'production' ? '실서버주소' : 'localhost: 3105'}/user`, {data:{...}}
)

-- react-native 인경우
url:`${!__DEV__? '실서버주소' : 'localhost: 3105'}/user`, {data:{...}}
```

- 개발 모드일 경우 `__DEV__` 는 true
- .env 환경이 변경될 경우 리로드를 해야한다.
- 라이브러리 react-native-config
- try catch는 자바스크립트에서 왠만하면 사용하지 않는것이 좋다. async await를 사용할 때 사용하면 된다.
- 서버에서 비밀번호의 경우 일방향 암호화가 된다. (hash화) 서버개발자도 암호를 알지 못한다.
  - 만약 값을 다시 얻어야 하는 경우 양방향 암호화를 사용한다. 예) 주민등록번호 등

### react-native-config 문제해결하기

-

### Redux, Config, EncryptedStorage, AsyncStorage의 차이

- 리덕스 같은 경우 램이라고 생각하자, 앱을 종료하면 저장된 메모리를 다 지워버린다.
- AsyncStorage 문제점은 암호화 되지 않은 스토리지라서 누구든지 값을 볼 수 있다. -> 귀중한 비밀번호, 토큰은 저장하지 않도록 한다.
  - 보안에 민감하지 않고 지속적으로 데이터를 유지해야 하는 경우에 사용한다.
- EncryptedStorage는 보호되어야할 정보를 저장하는데 사용한다. 사용법은 AsyncStorage 와 같다.
- 보안에 민감한 값은 리덕스에 저장해도 된다. 앱을 종료하면 사라지기 때문에.
- 개발 환경별로 달라지는 값은 react-native-congig에 저장하면 좋다.(암호화 안됨)

### 리덕스 소개

- 보통 실제 비지니스 모델의 경우 리덕스로 state.ui를 만든다. 예를 들어 데이터 패치로 인해 로딩이 걸릴 경우
- action : state를 바꾸는 동작
- action : state를 바꾸는 행위/동작
  dispatch: 그 액션을 실제로 실행하는 함수
  reducer : 액션이 실제로 실행되면 state를 바꾸는 로직

### accessToken과 refreshToken

- 토큰 : 내가 누구인지 서버에서 알 수 있도록 하는 것.
- 서버는 accessToken을 보고 유저를 파악한다. 하지만 해커가 이 accessToken을 탈취하면 서버는 이 사람이 해커인지 유저인지 파악을 하지 못한다.
  - 따라서 accessToken에는 유효기간을 준다. 해당 시간이 지나면 해당 accessToken은 사용하지 못한다.
  - 시간 연장을 하고 싶을때 refreshToken을 사용한다. 예를 들어 사용자가 시간 연장을 하고 싶을때 서버한테 refreshToken을 보내준다. 이때 서버는 해당 토큰을 확인하고
    사용하에게 acceessToken을 발급한다.
  - refreshToken까지 털리면 답이 없다. 따라서 해당 리프레쉬 토큰의 경우 EncryptedStorage에 저장을 하도록 한다.리프레쉬 토큰의 경우 엑세스토큰보다 유효기간이 긴 편이다.
- 제로초의 경우 accessToken은 리덕스로 관리하고 refreshToken의 경우는 EncryptedStorage에 저장한다.
- refreshToken이 털릴 위험을 서버에서 한번 더 방지할 수 있는데 예를 들면 내가 사용하고 있는 기기목록을 가져와서 사용자가 해당 기기 사용중이 아닌데? 라고 생각할 경우, 강제 종료를 누르면 서버는 해당 리프레쉬 토큰을 삭제한다.

### 웹소켓 연결하기

- 웹소켓으로 서버와 클라이언트와의 실시간 통신. 웹소켓을 사용하는 순간 배터리 소모가 많고, 서버쪽에서도 부담이 될 수 있다. 웬만하면 실시간 사용은 좋은 선택지는 아니다.
- 리액트 사용자라면 커스텀 훅을 잘해야 한다.
- socketIo -> long-polling?
