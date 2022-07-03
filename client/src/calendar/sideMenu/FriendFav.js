import SideMenuTitle from 'calendar/sideMenu/components/SideMenuTitle';
import useCalendar from 'context/calendar';
import TimetableCard from 'calendar/sideMenu/components/TimetableCard';
import Typography from '@mui/material/Typography';
import FadeContent from 'react-fade-in';
import { FadeIn } from 'react-slide-fade-in';

export default function FriendFav() {
  const { currentFriend } = useCalendar();

  return (
    // display user friend's first and last name
    <FadeIn from="right" positionOffset={200} durationInMilliseconds={500}>
      <FadeContent delay={100} transitionDuration={400}>
        <SideMenuTitle
          title={`${currentFriend.first} ${currentFriend.last}'s Favourited Timetables`}
          backTo={'select friend'}
        />
        {
          // display user friend's favorite timetables, if not , display no favorite timetables
          currentFriend?.favoritedTimetables?.length > 0 ? (
            currentFriend.favoritedTimetables.map((tb, index) => (
              <TimetableCard
                tb={tb}
                key={index}
                index={index}
                isAuthor={false}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: 'start' }}>
              {`${currentFriend.first} ${currentFriend.last} has no favourite timetables yet! `}
            </Typography>
          )
        }
      </FadeContent>
    </FadeIn>
  );
}
