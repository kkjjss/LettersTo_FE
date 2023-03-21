import {axiosInstance} from '../Utils/http';

export async function getImageUploadUrl(filename: string) {
  return await axiosInstance.post(`/files?filename=${filename}`);
}
