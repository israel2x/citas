import "react-big-calendar/lib/css/react-big-calendar.css";
import { Grid, Container, createStyles } from "@mantine/core";
import { Calendar, Event } from "react-big-calendar";
import addHours from "date-fns/addHours";
import { useState } from "react";
import { localizer } from "../../calendarLocalizer";
import { getMessagesES } from "../../getMessages";
import { CalendarEventCita } from "./calendarEventCita";
import { CalendarModal } from "./calendarModal";
import { useStoreActions } from "easy-peasy";

//import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const useStyles = createStyles((theme) => ({
  inner2: {
    backgroundColor: "white",
  },
}));

const CitasLayout = () => {
  const statusModalCitas = useStoreActions(
    (store: any) => store.changeOpenModalCitas
  );
  const { classes } = useStyles();

  const [lastView, setLastView] = useState("day");

  const [events, setEvents] = useState<Event[]>([
    {
      title: "Inaguracion Consultorio",
      notes: "Hay que comprar el pastel",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Israel",
        lastname: "Zurita",
      },
    },
    {
      title: "Cita",
      notes: "Hay que comprar el pastel",
      start: addHours(new Date(), 3),
      end: addHours(new Date(), 5),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Jose",
        lastname: "LOpez",
      },
    },
  ]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    statusModalCitas(true);
  };

  const onSelect = (event) => {
    console.log({ click: event });
  };

  const onViewChanged = (event) => {
    console.log({ viewChanged: event });
    //localStorage.setItem("lastView", event);
  };

  return (
    <Container my="md" className={classes.inner2}>
      <Grid>
        {/* <Grid.Col xs={12}>
          <div>
            <p>Button whastapp</p>
          </div>
        </Grid.Col> */}
        <Grid.Col xs={12}>
          <Calendar
            culture="es"
            localizer={localizer}
            events={events}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            resizable
            style={{ height: "calc( 100vh - 50px)" }}
            messages={getMessagesES()}
            eventPropGetter={eventStyleGetter}
            components={{
              event: CalendarEventCita,
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
          />
        </Grid.Col>
        {/* <Grid.Col xs={2}>
          <p>Calendar</p>
        </Grid.Col> */}
      </Grid>
      <CalendarModal></CalendarModal>
    </Container>
  );
};

export default CitasLayout;
