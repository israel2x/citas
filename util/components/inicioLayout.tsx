import { useState } from "react";
import { AppShell } from "@mantine/core";
import Navbar from "./sections/Navbar";
import Header from "./sections/Header";

const InicioLayout = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header
          opened={opened}
          setOpened={setOpened}
          toggleColorScheme={toggleColorScheme}
        />
      }
      navbar={<Navbar opened={opened} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default InicioLayout;
