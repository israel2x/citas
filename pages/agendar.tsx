import { useState } from "react";
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
} from "@mantine/core";
import {
  IconCheck,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";

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
              Paso 1: registrarse
            </Stepper.Step>
            <Stepper.Step
              label="Agendar Cita"
              description="Seleccione la fecha y hora"
              allowStepSelect={active > 1}
            >
              Paso 2: escoger hora y fecha de la cita
            </Stepper.Step>
            <Stepper.Step
              label="Confirmación"
              description="Comfirmación de la Cita"
              allowStepSelect={active > 2}
            >
              Paso 3: comfirmación de la cita
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
