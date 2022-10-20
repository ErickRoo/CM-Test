// eslint-disable-next-line import/prefer-default-export
export function filterMeetupsByUpcoming(meetups = []) {
  return {
    upcoming: meetups.filter((meetup) => meetup.upcomingEvent === true),
    past: meetups.filter((meetup) => meetup.upcomingEvent !== true),
  };
}
