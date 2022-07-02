import { useState } from 'react';
import { axios } from 'lib/axios';

export function useImg() {
  const [imgUrl, setImgUrl] = useState();

  const loadImg = () => {
    return axios
      .get('../../photo')
      .then((data) => {
        setImgUrl(data);
        Promise.resolve(data);
      })
      .catch((err) => Promise.reject(err));
  };
  return [imgUrl, loadImg];
}
