import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import {
  Stepper,
  Button,
  Group,
  Transition,
  Container,
  Text,
  Burger,
  Header,
  ActionIcon,
  Paper,
  createStyles,
  Stack,
  TextInput,
  SimpleGrid,
  MultiSelect,
  NumberInput,
  Indicator,
  Loader,
  Card,
  UnstyledButton,
  Anchor,
  Badge,
} from "@mantine/core";
import {
  IconCheck,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconCalendar,
} from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import "dayjs/locale/es-us";

const HEADER_HEIGHT = 60;
const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  linksHeader: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  linkHeader: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActiveHeader: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  //////////

  inner2: {
    backgroundColor: "#E1F0F4",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 3,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: "white",
  },

  innerFooter: {
    //css del footer
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },

  //////////card horus
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title_card: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item_hour: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "#C5DEFA",
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },

  item_hourb: {
    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

const links = [
  {
    link: "/landing",
    label: "Inicio",
  },
  {
    link: "/",
    label: "Nosotros",
  },
  {
    link: "/",
    label: "Noticias",
  },
  {
    link: "/citas",
    label: "Citas",
  },
];

const mockdata = [
  { title: "9:00", color: "violet" },
  { title: "10:00", color: "indigo" },
  { title: "11:00", color: "blue" },
  { title: "12:00", color: "green" },
  { title: "14:00", color: "teal" },
  { title: "15:00", color: "cyan" },
  { title: "16:00", color: "orange" },
  { title: "17:00", color: "orange" },
  { title: "18:00", color: "orange" },
];

const Agendar = () => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activelk, setActivelk] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.linkHeader, {
        [classes.linkActiveHeader]: activelk === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActivelk(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  const cita_hours = mockdata.map((item) => (
    /*  <UnstyledButton key={item.title} className={classes.item_hour}>
      <Text size="md">{item.title}</Text>
    </UnstyledButton> */

    <Badge
      variant="gradient"
      key={item.title}
      gradient={{ from: "cyan", to: "#77d8f3" }}
      className={classes.item_hourb}
    >
      {" "}
      <Text size="md">{item.title}</Text>
    </Badge>
  ));

  return (
    <>
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <Container className={classes.header}>
          {/* <MantineLogo size={28} /> */}
          <Text>TB</Text>
          <Group spacing={5} className={classes.linksHeader}>
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>

      <Container className={classes.inner2}>
        <div>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="Registro"
              description="Registrarse"
              allowStepSelect={active > 0}
            >
              <Stack>
                <SimpleGrid
                  cols={2}
                  mt="xl"
                  breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                >
                  <TextInput
                    required
                    label="Nombre"
                    placeholder="Nombre del paciente"
                  />
                  <TextInput
                    required
                    label="Apellido"
                    placeholder="Apellido del paciente"
                  />
                </SimpleGrid>

                <SimpleGrid
                  cols={2}
                  mt="xl"
                  breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                >
                  <NumberInput
                    required
                    label="Edad"
                    placeholder="Edad del paciente"
                  />
                  <TextInput
                    required
                    label="Teléfono"
                    placeholder="Teléfono del paciente"
                  />
                </SimpleGrid>

                <MultiSelect
                  required
                  mt="xl"
                  data={[
                    "No habla",
                    "Sindrome de Down",
                    "Recomendación Profesora",
                  ]}
                  label="Motivo de Consulta"
                  placeholder="Motivos por los cuales considera que el paciente necesita terapia"
                  description="Debe elegir uno o varios motivos"
                />
              </Stack>
            </Stepper.Step>

            <Stepper.Step
              label="Agendar Cita"
              description="Seleccione la fecha y hora"
              allowStepSelect={active > 1}
            >
              <SimpleGrid
                cols={2}
                mt="xl"
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              >
                <Container>
                  <DatePicker
                    required
                    locale="es-us"
                    allowLevelChange={false}
                    label="Fecha de la Cita"
                    placeholder="Elija una fecha"
                    renderDay={(date) => {
                      const day = date.getDate();
                      return (
                        <Indicator
                          size={6}
                          color="red"
                          offset={8}
                          disabled={day !== 15}
                        >
                          <div>{day}</div>
                        </Indicator>
                      );
                    }}
                    icon={<IconCalendar size={16} />}
                  />
                </Container>

                <Container>
                  <Card withBorder radius="md" className={classes.card}>
                    <Group position="apart">
                      <Text className={classes.title_card}>
                        Horarios Disponibles
                      </Text>
                      <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
                        * Seleccione un horario
                      </Anchor>
                    </Group>
                    <SimpleGrid cols={3} mt="md">
                      {cita_hours}
                    </SimpleGrid>
                  </Card>
                </Container>
              </SimpleGrid>
            </Stepper.Step>

            <Stepper.Step
              label="Confirmación"
              description="Comfirmación de la Cita"
              allowStepSelect={active > 2}
            >
              <Loader size="xl" />
            </Stepper.Step>

            <Stepper.Completed>
              Cita Agendada, gracias por usas nuestros servicios
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Regresar
            </Button>
            <Button onClick={nextStep}>Siguiente</Button>
          </Group>
        </div>
      </Container>

      <div className={classes.footer}>
        <Container className={classes.innerFooter}>
          {/*  <MantineLogo size={28} /> */}
          <Text>La Troncal, Ecuador</Text>
          <Group spacing="xs" className={classes.links} position="right" noWrap>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>

            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>

            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </div>
    </>
  );
};

Agendar.authPage = true;

export default Agendar;
