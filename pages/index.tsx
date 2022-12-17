import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  ActionIcon,
  Header,
  Burger,
  Paper,
  Transition,
} from "@mantine/core";
import {
  IconCheck,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import imageSVG from "../public/image.svg";
import Thalia_Bustamante_La_Troncal from "../public/Thalia_Bustamante_La_Troncal.png";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";

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

const Home = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.linkHeader, {
        [classes.linkActiveHeader]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  const handleAgendarCitas = () => {
    //Router.push("/board");
  };

  return (
    <div className={classes.inner2}>
      <Head>
        <title>Centro de Terapia de Lenguaje - Thalia Bustamante</title>
        <meta
          name="description"
          content="Centro de Terapia de Lenguaje, La Troncal Cañar, Ecuador"
        ></meta>
        <meta
          property="og:title"
          content="Centro de Terapia de Lenguaje"
        ></meta>
        <link rel="icon" href="/abc.png" />
      </Head>
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
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Centro de Terapia de
              <span className={classes.highlight}>Lenguaje</span>
            </Title>
            <Text color="dimmed" mt="md">
              Ofrecemos un servicio de terapias personalizadas a nuestros
              pacientes de acuerdo a sus necesidades, nuestro objetivo es
              mejorar las habilidades comunicativas que le permitiran a su hijo
              expresarse de manera más efectiva, así como:
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Potenciar</b> – el habla inteligible para que otros entiendan
                a su hijo.
              </List.Item>
              <List.Item>
                <b>Mejorar</b> – la capacidad de comprender y expresar sus
                pensamientos, ideas y sentimientos.
              </List.Item>
              <List.Item>
                <b>Perfeccionar</b> – la calidad del lenguaje, en concreto la
                pronunciación o el lenguaje espontáneo.
              </List.Item>
              <List.Item>
                <b>Desarrollo</b> – comunicativo y linguistico eficaz acorde a
                la edad del niño.
              </List.Item>
            </List>

            <Group mt={30}>
              <Link
                href={"https://web.whatsapp.com/send?phone=593959997375"}
                passHref={true}
                target={"_blank"}
              >
                <Button
                  radius="xl"
                  size="md"
                  className={classes.control}
                  onClick={handleAgendarCitas}
                >
                  Agendar Cita
                </Button>
              </Link>
              {/*  <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button> */}
            </Group>
          </div>
          {/*  <Image src={image.src} className={classes.image} /> */}
          <Image
            src="Thalia_Bustamante_La_Troncal.png"
            className={classes.image}
            alt="Lic. Thalia Bustamante"
            caption="Lic. Thalia Bustamante"
          />
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
    </div>
  );
};

export default Home;
