import { useState } from 'react';

export function useImg() {
  const [imgUrl, setImgUrl] = useState();

  const loadImg = () => {
    return new Promise((res, rej) => {
      fetch('../photo', { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
          setImgUrl(data);
          res(data);
        })
        .catch((err) => console.error(err));
    });
  };
  return [imgUrl, loadImg];
}
