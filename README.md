# 📍 모두를 위한 하나의 SPOT

> 🔗 **배포 주소** : https://www.moisam.kr

<img width="1247" alt="spot" src="https://github.com/user-attachments/assets/6948789d-d053-41c5-99f1-ac7fa12d82a4" />

# 💻 Development

## 🗒️ API 명세서

> 🔗 [API 명세서](https://valley-tenor-1ca.notion.site/API-1c7f3199866980d388f4f9da3aa78fb0)

> 🔗 [Swagger](https://api.pickspot.co.kr/swagger-ui/index.html)

## 🏛️ System Architecture

![system](https://github.com/user-attachments/assets/c5dcde53-06eb-49df-9134-00cbad2e144a)

## 📊 ERD

![erd](https://github.com/user-attachments/assets/433d9a1d-4738-478a-bfb3-c0f61ba6ca1c)

# 🔌 Frontend

## Frontend 기술 스택

| 기술 스택       | 선택 이유                                                     |
| --------------- | ------------------------------------------------------------- |
| **React.js**    | 실시간 렌더링과 컴포넌트 기반 UI로 재사용성과 유지보수성 확보 |
| **TypeScript**  | 정적 타이핑으로 오류 예방 및 자동완성/리팩토링 편의성 향상    |
| **Vite**        | 빠른 번들링과 HMR로 개발 생산성 증가                          |
| **Zustand**     | 간단하고 가벼운 전역 상태 관리                                |
| **Axios**       | 간편한 API 요청 처리와 비동기 관리                            |
| **TailwindCSS** | 빠르고 일관된 유틸리티 기반 스타일링                          |
| **React-Query** | 서버 상태 캐싱 및 로딩/에러 처리 등 API 중심 앱에 최적화      |
| **Jest**        | 안정적인 리팩토링을 위한 테스트 코드 작성 가능                |

## Directory 구조

```
src/
├── 📁app/ # 애플리케이션 초기화, 스타일, 프로바이더
│   ├── 📁routes/ # 라우터 설정
├── 📁pages/ #페이지 컴포넌트 (각 파일은 URL 경로 하나를 담당하며, 각 페이지는 아래 features에서 조합된 UI 컴포넌트를 포함)
│   ├── 📜MapViewPage.tsx
│   ├── 📜HistoryPage.tsx
│   ├── 📜FindPage.tsx
│   └── 📜ReviewPage.tsx
│   └── 📜DetailPage.tsx
│   └── 📜MainPage.tsx
├── 📁widgets/ # 복합적인 UI 블록(페이지와 엔티티 사이에서 재사용되는 UI 구성 요소)
│   └── 📁headers/
├── 📁features/ # 각 기능(도메인) 단위로 묶인 컴포넌트 집합
│   ├── 📁mapView/
│   ├── 📁history/
│   ├── 📁find/
│   ├── 📁review/
│   ├── 📁visited/
│   └── 📁notVisited/
├── 📁entities/ # 비즈니스 중심의 재사용 가능한 단위 (재사용성이 높은 api, hooks, model 분리)
│   ├── 📁user/
│   ├── 📁place/
│   └── 📁event/
├── 📁shared/ # 프로젝트 전역에서 재사용 가능한 유틸리티/설정 모음
│   ├── 📁api/ # Axios 등의 API 인스턴스, 인터셉터 정의
│   ├── 📁utils/ # 날짜 포매팅, debounce 등 유틸리티 함수들이 위치
│   ├── 📁ui/ # 버튼, 모달, 인풋, 바텀시트 등 원자 단위 UI 컴포넌트
│   ├── 📁stores/ # 글로벌 상태 관리
│   └── 📁model/ # 전역적으로 공유되는 타입 혹은 Enum
└── 📁assets/ # 정적 리소스를 저장하는 폴더 (이미지 성능 최적화)
    ├── 📁icon/
    └── 📁image/
```

### Feature 구조

```
feature/
├── 📁ui/                    # UI 관련 코드
│   ├── 📜index.ts          # 컴포넌트 export
│   ├── 📜Component.tsx     # 컴포넌트 파일
│
├── 📁model/                # 타입 정의
│   ├── 📜index.ts         # 타입 export
│   └── 📜feature.type.ts         # 타입 정의 파일
│
├── 📁service/             # API 관련 코드
│   ├── 📜index.ts        # 서비스 export
│   └── 📜api.ts          # API 호출 함수
│
├── 📁hooks/              # 커스텀 훅
│   ├── 📜index.ts       # 훅 export
└── └── 📜useHook.ts     # 훅 정의 파일
```

## 코드 리팩토링

> **Axios + React + Query**

API 요청은 **service**에서 Axios로만 처리하고, **hooks**에서 React Query를 통해 상태를 관리하도록 분리해 각 역할의
책임을 명확히 했습니다. 이로써 **코드의 가독성과 유지보수성**이 향상되었습니다.

> **Jest 기반 테스트 코드 작성**

utils 일부 함수에 대한 단위 테스트를 작성하여 코드의 안정성과 신뢰도를 높였습니다. 변경 사항에 대한 회귀 테스트가
가능해져 **안정적인 리팩토링과 배포**가 가능해졌습니다.

> **바텀시트 사용성 개선**

- 스냅 포인트 기능 구현: 30%, 50%, 80% 위치에 바텀시트가 고정되도록 설정하여 사용자가 직관적으로 조작할 수 있도록
  했습니다.

- 동적 높이 조절: ResizeObserver를 활용해 콘텐츠 크기에 따라 바텀시트 높이가 자동으로 조절되도록 구현했습니다.

- 스크롤/드래그 분리 로직:
  - data-scrollable 속성으로 스크롤 가능한 영역을 식별
  - scrollTop === 0일 때만 드래그 가능
  - touchAction: pan-y, overscrollBehavior: contain을 적용해 스크롤과 드래그의 충돌을 방지

이를 통해 모바일 환경에서 부드럽고 직관적인 UX를 제공할 수 있었습니다. 또한, 컴파운드 컴포넌트 패턴을 도입하여 관련
컴포넌트를 네임스페이스 형태로 구성하고, 선언적이고 유연한 API를 제공할 수 있도록 설계했습니다.

## 성능 최적화

> **Lighthouse 기반 이미지 최적화**

기존의 PNG 파일을 **WebP 포맷**으로 교체하였습니다. 또한, Vite 환경에 맞춰 public/icons에 있던 이미지를
src/assets/icons로 옮기고, **static import 방식**으로 변경하여 **번들 최적화 및 로딩 속도 개선**을 진행하였습니다.

# 🚀 Backend

## Backend 기술 스택

| 기술 스택                   | 주요 활용 및 선택 이유                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| **Java 21**                 | 장기 지원(LTS, ~2031) 제공, Virtual Thread로 다중 외부 API 호출 최적화                           |
| **Spring Boot 3.4.4**       | Java 21 공식 지원, Virtual Thread 최적화, RestClient 및 Actuator 등 최신 기능 포함               |
| **Spring Data JPA**         | JPA 기반 ORM 구현, Repository로 CRUD 자동화, QueryDSL과의 연계로 복잡한 쿼리 간결 처리           |
| **PostgreSQL + PostGIS**    | 인덱스 최적화로 저장 효율 증가, PostGIS로 대용량 공간 좌표 데이터 처리 가능                          |
| **Redis**                   | 인메모리 캐시로 실시간 경로 조회 성능 향상, TTL 기반 캐싱으로 멱등성 보장                        |
| **Docker & Docker Compose** | 컨테이너 단위 배포로 확장성 높음, 컴포넌트별 독립 실행 및 관리 용이                              |
| **GitHub Actions**          | 코드 푸시 시 자동 CI/CD 실행, GUI 기반 모니터링으로 개발 편의성 향상                             |
| **QueryDSL**                | 타입 안전한 DSL 기반 쿼리 작성, 컴파일 타임 오류 검출로 안정성 확보                              |
| **Naver Cloud Platform**    | 유연한 배포/네트워크 구성, 한글 문서로 접근성 우수, 컨테이너/레지스트리/Object Storage 연동 용이 |

## 성능 최적화

> **무한 스크롤 쿼리 최적화**

- slice 방식의 무한 스크롤 방식과 쿼리 작성 시 fetch join 을 통해서 쿼리 발생을 감소 시켰습니다
- 이 과정에서 QueryDSL 사용을 통해 복잡한 조건의 동적 쿼리를 쉽게 구성하였습니다

> **Redis 기반 실시간 캐싱 처리**

- 외부 API를 활용한 실시간 경로 조회 및 중간 지점 계산 시, 디스크 기반 DB 접근(I/O)을 줄이기 위해 **인메모리 NoSQL인
  Redis**를 도입하였습니다.
- 외부 API 응답을 Redis에 캐싱하고, **TTL(Time To Live)** 을 적용하여 **멱등성 보장 및 중복 호출 방지**를
  실현하였습니다. 이를 통해 **외부 API 호출 횟수 제한 정책에 유연하게 대응**할 수 있도록 구성하였습니다.

> **주소 파싱 시 불필요한 Pattern 객체 생성 제거**

- 기존에는 `address.split(" ")`을 사용하여 첫 번째 지역명을 추출했지만, 이는 내부적으로 `Pattern.compile()`을 통해
  정규표현식 객체를 생성하게 됩니다.
- 이를 `substring()`과 `indexOf()`기반으로 변경함으로써 **Pattern 객체 생성을 방지**하고, **GC 부담을 줄여 문자열 처리
  성능을 확보**하였습니다.
  
![performance](https://github.com/user-attachments/assets/79001665-0321-48df-89b2-f3d4c34e16cc)
