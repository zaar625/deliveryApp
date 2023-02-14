# 기본 프로젝트 구조와 index.js

- RN에서 파일의 시작점은 index.js이다.
- expo는 커스터마이징하기가 어렵기 떄문에 cli로 개발하는 사람이 많은 편
- ios 기준으로 개발을 진행할 것 -> android와 ios UI 차이가 있어 ios를 먼저 하는 것이 수정이 적음
- react-native 에서 굳이 styled-component를 사용할 이유가 없다.

# 리액트 네이티브 기본 컴포넌트 분석

- 코드를 분석할 때에는 마지막 export default 부분부터 클릭하여 이동하면서 확인한다.
- 다크모드 지원 useColorSheme() 훅을 이용한다.
- 리액트와 다르다. 같은것을 찾자면 비지니스 로직정도이다.
- 스타일을 인라인 스타일 보다 StyleSheet.create() 를 사용하는 것이 더 효율적이며 성능면에서 좋다.(드라마틱하진 않다.)
- 스타일에 변수가 들어가는 경우는 인라인 스타일로 한다.
- react-native-status-bar-height 상태 바 높이 라이브러리
- 내용들이 수백개 수천개 일경우 scrollView를 사용하지 않도록 한다. 성능면에서 좋지 않기 때문에 FlatList를 사용한다.
- 하나의 파일 안에 두개이상의 컴포넌트를 넣는 것은 좋은 코딩 스타일이 아니다. 파일을 분리시킬 것.

# 데브메뉴와 Fliper

- 관련 라이브러리들이 굉장히 많다. 하지만 잘 돌아가지 않는 라이브러리도 있기 때문에 그럴경우 해당 라이브러리를 까서 수정하면서 진행해야 하는 경우도 있다.
- fetchpakage를 이용하여 고친다 추후에 소개함.
- web 디버그모드 -> 굉장히 불편하다. API를 사용할 때 네트워크 요청 같은 것들은 전혀 안뜬다.
- 모바일에서 디버그 모드가 힘들므로, Flipper 사이트에서 다운로드하여 사용한다. 다만 설치 후 잔 에러가 많아서 초보자들이 사용하기 힘든 경우가 있으니 참고하자.
  - 레이어가 복잡하고, 서비스가 고도화 될 경우 필히 사용해야하니 한번 쯤 미리 사용해보는 것도 좋다.
  - Flipper에서 추천하는 플러그인 1. flipper-plugin-redux-debugger, 2. flipper-plugin-async-storage
- Q. npm i ~~ --force 는 뭐지?

# 앱 이름 바꾸기, 강좌 폴더 구조 잡기

- app.json에서 name을 바꾸려는 이유. -> 배포를 하려고 하는데 누군가가 해당 이름을 사용하고 있을 경우
- 네이티브 관련된 모듈은 modules 폴더에 넣는다.

# 리액트 내비게이션 사용해보기

- https://reactnavigation.org/docs/screen의 children 내용 보기
- 네비게이터 사용 시 스크린 설계를 어떻게 해야 할지 고민을 하고 작성한다.

# flex와 요소 배치

- 타입스크립트는 간략히 말하자면 매개변수,변수,리턴 값을 어떤 타입을 가졌는지 미리 확정하는 것.
- touchableHighlight
- flex: 비율, justifyContent:'center' 세로기준 중앙정렬, alignItems: 가로 기준 중앙 정렬

# 리액트 내비게이션 화면 전환하기

```
<Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
</Stack.Screen>
```

위 코드에서 props에 마우스를 올려보면 props 타입을 확인할수 있다. 필수인 route와 navigation이 필요하다는 것.
일반적으로 인라인으로 작성할 경우 자동으로 props를 내려준다.

# 라우트 params와 헤더 옵션들

- navigate VS push의 차이점: navigate의 경우 새로 이동할 화면이 현재 화면과 같으면 새로운 화면을 쌓지 않고 파라미터만 변경.
  - 따라서 화면 전환효과도 없고 뒤로 가기를 눌렀을 때 스택으로 쌓지 않기 때문에 처음 진입화면으로 돌아간다.
- push는 정반대
- 네비게이터로 params를 보낼 경우 유저아이디 같은 간단한 파라미터만 보내고, 복잡한 객체의 경우 글로벌 스토어로 관리한다.

# 보너스 relative, absolute 모달 그리기

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

# 앱 라우터 구성하기

# 스크린과 중첩 라우팅

- 최근 화살표함수보다 일반 선언함수로 많이 작성한다.
- 추후 맵스택 위에 완료 처리 스택을 쌓을 것이다. 그리고 완료가 되면 완료 스택을 제거하는 방식으로 진행을 할 것인데 그 이유는 맵의 경우 로딩 속도가
  느리며, 폰 성능으로 인해 사용자가 불편할 수 있고, 굳이 API를 계속해서 날릴 필요가 없음.
