import {axiosInstance} from '../Utils/http';
import {AuthTokens, ProviderToken} from '../types/auth';

export async function verifyProviderToken(
  body: ProviderToken,
): Promise<AuthTokens> {
  return await axiosInstance.post('/token', body);
}
