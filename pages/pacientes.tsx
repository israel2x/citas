import Head from "next/head";
import { useState, useEffect } from "react";
import { Table, ScrollArea, Menu, Divider, Drawer, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useClipboard } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";

import { Edit2, Send, Save, Trash2 } from "react-feather";

import Search from "../util/components/forms/Search";
import EditUserForm from "../util/components/forms/EditUser";
import SendMessageForm from "../util/components/forms/SendMessage";

const MOCKUP_USERS = [
  {
    name: "John Doe",
    email: "john@doe.com",
    address: "Mankato Mississippi 96522, Nulla st. 10",
    workplace: "45",
    phone: "(257) 563-7401",
  },
  {
    name: "Cecilia Chapman",
    email: "Cecilia@doe.com",
    address: "Tamuning PA 10855, Sodales Av. 4264",
    workplace: "38",
    phone: "(786) 713-8616",
  },
  {
    name: "Kyla Olsen",
    email: "Kyla@doe.com",
    address: "Chelsea MI 67708, Nunc Road 4",
    workplace: "27",
    phone: "(947) 278-5929",
  },
  {
    name: "Nyssa Vazquez",
    email: "Nyssa@doe.com",
    address: "Latrobe DE 38100, Viverra. Avenue",
    workplace: "32",
    phone: "(608) 265-2215",
  },
  {
    name: "Aaron Hawkins",
    email: "Aaron@doe.com",
    address: "Santa Rosa MN 98804, Tortor. Street 42",
    workplace: "25",
    phone: "(959) 119-8364",
  },
];

const Pacientes = (/*props*/) => {
  const clipboard = useClipboard();
  const notifications = useNotifications();
  const modals = useModals();

  const [users, setUsers] = useState(MOCKUP_USERS); // props.users
  const [tableRows, setTableRows] = useState([]);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setTableRows(
      users.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>{user.workplace}</td>
          <td>{user.phone}</td>
          <td>
            <Menu>
              <Menu.Label>{user.name}</Menu.Label>
              <Menu.Item
                icon={<Edit2 />}
                onClick={() => {
                  setSelectedProfileData(user);
                  toggleDrawer(true);
                }}
              >
                Editar
              </Menu.Item>
              <Menu.Item icon={<Send />} onClick={() => sendMessage(user)}>
                Enviar
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<Save />} onClick={() => copyProfile(user)}>
                Descargar
              </Menu.Item>
              <Menu.Item
                icon={<Trash2 />}
                onClick={() => deleteProfile(user)}
                color="red"
              >
                Eliminar
              </Menu.Item>
            </Menu>
          </td>
        </tr>
      ))
    );
  }, [users]);

  const onSearch = (search) => {
    setSearchLoading(true);

    search = search.toLowerCase().trim();

    if (!search) {
      setUsers(MOCKUP_USERS); // props.users
      setSearchLoading(false);
      return;
    }

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.address.toLowerCase().includes(search) ||
        user.workplace.toLowerCase().includes(search) ||
        user.phone.includes(search)
    );

    setUsers(filteredUsers);

    setSearchLoading(false);
  };

  const cancelSearch = () => {
    setUsers(MOCKUP_USERS); // props.users
  };

  const onSubmitEditForm = (oldUser, newUser) => {
    toggleDrawer(false);

    // edit data in db

    let tmpUsers = users;
    tmpUsers.splice(tmpUsers.indexOf(oldUser), 0, newUser);
    tmpUsers = tmpUsers.filter((u) => u !== oldUser);
    setUsers(tmpUsers);

    notifications.showNotification({
      title: "Información Paciente",
      message: `Paciente ${newUser.name} `,
      color: "teal",
    });
  };

  const sendMessage = (user) => {
    const onSubmit = (subject, message) => {
      modals.closeModal(modal);
      onSendMessage(user, subject, message);
    };

    const modal = modals.openModal({
      title: "Paciente",
      children: <SendMessageForm user={user} onSubmit={onSubmit} />,
      centered: true,
    });
  };

  const onSendMessage = (user, subject, message) => {
    // send message to user on backend

    notifications.showNotification({
      title: "Enviar Información",
      message: `Paciente ${user.email} detalle`,
      color: "teal",
    });
  };

  const copyProfile = (user) => {
    clipboard.copy(JSON.stringify(user));

    notifications.showNotification({
      title: "Información del Paciente",
      message: `Paciente ${user.name} descargando la información`,
      color: "teal",
    });
  };

  const deleteProfile = (user) => {
    modals.openConfirmModal({
      title: "Eliminar Paciente",
      children: (
        <Text size="sm" lineClamp={2}>
          Paciente <b>{user.name}</b> ?
          <br />
          Se Elimina toda la información!
        </Text>
      ),
      centered: true,
      labels: { confirm: "Eliminar", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: () => onDeleteProfile(user),
    });
  };

  const onDeleteProfile = (user) => {
    // remove data in db

    let tmpUsers = users;
    tmpUsers = tmpUsers.filter((u) => u !== user);
    setUsers(tmpUsers);

    notifications.showNotification({
      title: "Paciente",
      message: `Paciente ${user.name} detalle`,
      color: "red",
    });
  };

  return (
    <>
      <Head>
        <title>Pacientes | Smart Citas</title>
        <meta
          name="description"
          content="A Nextine oldal felhasználókat kezelő oldala."
        />
      </Head>

      <Text align="center" weight="bold" mb="xs" size="lg">
        Pacientes
      </Text>

      <Drawer
        opened={drawerOpened}
        onClose={() => toggleDrawer(false)}
        title="Editar Paciente"
        padding="xl"
        size="xl"
      >
        <EditUserForm
          data={selectedProfileData}
          submitForm={onSubmitEditForm}
        />
      </Drawer>

      <Search
        loading={searchLoading}
        onSubmit={onSearch}
        onCancel={cancelSearch}
      />

      {tableRows.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Nombres</th>
                <th>E-mail</th>
                <th>Dirección</th>
                <th>Edad</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Nincs megjeleníthető adat.
        </Text>
      )}
    </>
  );
};

/*
export async function getServerSideProps() {
  const request = await fetch("http://localhost:3000/api/users");
  const users = await request.json();

  return {
    props: {
      users,
    },
  };
}
*/

export default Pacientes;
