import {BASE_URL_TEST} from '../Constants/common';

export const getImageUrl = (image: string) => {
  return BASE_URL_TEST + `/files/${image}`;
};
