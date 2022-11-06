import {instance} from '../Utils/http';

export async function getImageUploadUrl(filename: string) {
  return await instance.post(`/files?filename=${filename}`);
}
