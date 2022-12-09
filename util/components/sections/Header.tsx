import {
  Burger,
  Header,
  MediaQuery,
  Text,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { Sun } from "react-feather";

const useStyles = createStyles((theme) => ({
  inner2: {
    backgroundColor: "white",
  },
}));

export default function HeaderComponent(props) {
  const { classes } = useStyles();

  return (
    <Header height={70} p="md" className={classes.inner2}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.opened}
            onClick={() => props.setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text fw="700" size="xl">
          Smart Citas
        </Text>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ActionIcon
            title="Modo Oscuro"
            onClick={props.toggleColorScheme}
            size="lg"
            radius="md"
            variant="outline"
          >
            <Sun />
          </ActionIcon>
        </div>
      </div>
    </Header>
  );
}
