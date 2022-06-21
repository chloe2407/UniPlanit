import { useState } from 'react';
import { axios } from 'lib/axios';

export function useImg() {
  const [imgUrl, setImgUrl] = useState();

  const loadImg = () => {
    return axios
      .get('photo')
      .then((data) => {
        setImgUrl(data);
        Promise.resolve(data);
      })
      .catch((err) => Promise.reject(err));
  };
  return [imgUrl, loadImg];
}

export function useDeleteFriend() {
  const deleteFriend = (friendInfo, handleFriendChange, handleSuccessMsg, handleErrorMsg) => {
    return axios.post('/users/friends/delete', { friendId: friendInfo._id }).then((data) => {
      handleSuccessMsg(`Successfully deleted ${friendInfo.first} ${friendInfo.last}`);
      handleFriendChange();
    });
  };
  return [deleteFriend];
}

// export const useQueryUser = (userId) => {
//   const [queryUser, setQueryUser] = useState();

//   const getQueryUser = (userId) => {
//     return axios
//       .get(`users/${userId}`)
//       .then((data) => {
//         if(!data.err){
//         setQueryUser(queryUser);
//         Promise.resolve(data);
//         } else {
//           console.log(data.err)
//           Promise.reject(data.err)
//         }
//       })
//       .catch((err) => Promise.reject(err));
//   };
//   return [queryUser, getQueryUser];
// };
