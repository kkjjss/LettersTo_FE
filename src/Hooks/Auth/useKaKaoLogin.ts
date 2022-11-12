import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import {postToken} from '../../APIs/token';
import {RegisterToken} from '../../types/types';

export const useKakaoLogin = () => {
  const isKakaoOAuthToken = (arg: any): arg is KakaoOAuthToken => {
    return arg.idToken !== undefined;
  };

  const signUpWithKakao = async (): Promise<RegisterToken> => {
    // 카카오 로그인 호출
    const token = await login();
    if (isKakaoOAuthToken(token)) {
      const tokenInfo = {
        idToken: token.idToken,
      };

      // registerToken 발급
      const userTokens = await postToken(tokenInfo);
      console.log(userTokens);

      return userTokens;
    } else {
      throw new Error('KakaoOAuthToken 형식이 아님');
    }
  };

  return {signUpWithKakao};
};
