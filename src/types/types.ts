export type StackParamsList = {
  // Splash
  Splash: undefined;

  // 메인 서비스 스택
  Home: undefined;

  // 인증 관련 스택
  Auth: {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    a: string | undefined;
  };
};
