exports.filterMeetings = (meetUpInterviews = []) => {
  const response = { past: [], upcoming: [] };

  meetUpInterviews.forEach((oneMeetUp) => {
    const todayMs = new Date().getTime();
    const meetMs = new Date(oneMeetUp.eventDate).getTime();

    response[meetMs > todayMs ? 'upcoming' : 'past'].push(oneMeetUp);
  });

  return response;
};
