export const CalendarEventCita = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name + " " + user.lastname} </span>
    </>
  );
};
