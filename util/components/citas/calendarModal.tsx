import { useState, useEffect } from "react";
import { Modal, Button, TextInput, Box } from "@mantine/core";
import { addHours } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
import { useStoreState, useStoreActions } from "easy-peasy";

export const CalendarModal = ({}) => {
  const openModal = useStoreState((state: any) => state.openModalCitas);
  const closeModalCitas = useStoreActions(
    (store: any) => store.changeOpenModalCitas
  );

  const [formValuesCita, setFormValuesCita] = useState({
    title: "Nueva Cita",
    notes: "Paciente nuevo",
    start: new Date(),
    end: addHours(new Date(), 2),
    name: "Israel",
    lastname: "Zurita",
    edad: 38,
    cedula: "0924262397",
    telefono: "0962663021",
    email: "ezurita@fiec.espol.edu.ec",
  });

  const onInputChanged = ({ target }) => {
    setFormValuesCita({
      ...formValuesCita,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, start) => {
    setFormValuesCita({
      ...formValuesCita,
      [start]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("data");
  };

  const closeModalhandeler = () => {
    //setOpened(false);
    closeModalCitas(false);
    console.log("cerrando modal");
  };

  return (
    <>
      <Modal opened={openModal} onClose={closeModalhandeler} title="Cita">
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form onSubmit={onSubmit}>
            <DatePicker
              selected={formValuesCita.start}
              showTimeSelect
              onChange={(event) => onDateChanged(event, "start")}
              dateFormat="d MMMM h:mm aa"
              locale="es"
              timeCaption="Hora"

              /* onSelect={handleDateSelect} //when day is clicked
                onChange={handleDateChange} //only when value has changed */
            />
            <TextInput
              label="Hora Cita"
              placeholder="Hora de la cita"
              value={formValuesCita.name}
              onChange={onInputChanged}
              mt="md"
            />
            <TextInput
              label="Nombres"
              placeholder="Nombres"
              value={formValuesCita.name}
              onChange={onInputChanged}
              mt="md"
            />
            <TextInput
              label="Apellidos"
              placeholder="Apellidos"
              value={formValuesCita.lastname}
              mt="md"
              onChange={onInputChanged}
            />
            <TextInput
              type="number"
              label="Edad"
              placeholder="Edad"
              value={formValuesCita.edad}
              mt="md"
              onChange={onInputChanged}
            />
            <TextInput
              label="Cédula"
              placeholder="Cédula"
              value={formValuesCita.cedula}
              mt="md"
              onChange={onInputChanged}
            />
            <TextInput
              label="Célular"
              placeholder="Célular"
              value={formValuesCita.telefono}
              mt="md"
              onChange={onInputChanged}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              value={formValuesCita.email}
              mt="md"
              onChange={onInputChanged}
            />

            <Button type="submit" mt="md">
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>

      {/* <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group> */}
    </>
  );
};
