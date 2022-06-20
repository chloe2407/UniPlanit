export function useDeleteFriend() {
  const deleteFriend = (friendInfo, handleFriendChange, handleSuccessMsg, handleErrorMsg) => {
    fetch('/users/friends/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friendId: friendInfo._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleSuccessMsg(`Successfully deleted ${friendInfo.first} ${friendInfo.last}`);
        handleFriendChange();
        return data;
      });
  };
  return [deleteFriend];
}
