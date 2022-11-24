export type StackParamsList = {
    // Splash
    Splash: undefined;

    // 메인 서비스 스택
    Home: undefined;

    // 편지 관련 스택
    ReadLetter: {id: number; to: 'PUBLIC' | 'DELIVERY'};
    LetterBoxList: undefined;
    LetterBoxDetail: {id: number; fromMemberId: number};

    // 인증 관련 스택
    Auth: undefined;

    // 회원가입 스택
    NicknameForm: undefined;
    TopicsForm: undefined;
    PersonalityForm: undefined;
    LocationForm: undefined;

    // 회원 정보 수정 스택
    MyPage: undefined;
    AccountDelete: undefined;

    // 편지 작성
    LetterEditor: {reply: number; to: 'PUBLIC' | 'DELIVERY'} | undefined;
    CoverDeliverySelector: {reply: number; to: 'PUBLIC' | 'DELIVERY'};
    CoverTopicEditor: {reply: number; to: 'PUBLIC' | 'DELIVERY'} | undefined;
    CoverPersonalityEditor:
        | {reply: number; to: 'PUBLIC' | 'DELIVERY'}
        | undefined;
    CoverStampSelector: {reply: number; to: 'PUBLIC' | 'DELIVERY'} | undefined;
    LetterComplete: {reply: number; to: 'PUBLIC' | 'DELIVERY'} | undefined;
};
