export const getSessionStatus = (registrationStart, registrationEnd) => {
  const now = new Date();
  const start = new Date(registrationStart);
  const end = new Date(registrationEnd);

  if (now >= start && now <= end) {
    return "Open"  
  } else if (now > end) {
    return "Closed"  
  } else if (now < start) {
    return "Upcoming"  
  }
};