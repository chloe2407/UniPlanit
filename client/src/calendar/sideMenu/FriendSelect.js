import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import { getUserFriend } from 'calendar/api/sideMenuApi';
import { useEffect } from 'react';
import useSocket from 'context/socket';
import useCalendar from 'context/calendar';
import Typography from '@mui/material/Typography';
import FriendCard from 'calendar/sideMenu/components/FriendCard';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';

export default function FriendSelect() {
  const { socket } = useSocket();
  const { userFriend } = useCalendar();

  useEffect(() => {
    getUserFriend(socket);
  }, []);

  return (
    <FadeIn from="right" positionOffset={200} durationInMilliseconds={500}>
      <FadeContent delay={200} transitionDuration={400}>
        <SideMenuTitle title={"Friends' Timetables"} backTo={null} />
        {userFriend ? (
          userFriend.map((f) => <FriendCard key={f._id} friendInfo={f} />)
        ) : (
          <Typography>Start by adding a friend!</Typography>
        )}
      </FadeContent>
    </FadeIn>
  );
}
