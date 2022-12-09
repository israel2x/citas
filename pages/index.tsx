import Head from "next/head";
import {
  createStyles,
  useMantineTheme,
  Container,
  Text,
  Title,
  Button,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: "#E1F0F4",
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>Citas Thalia Bustamante</title>
        <meta
          name="description"
          content="Citas Thalia Bustamante, La Troncal, Ecuador"
        />
      </Head>

      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Citas Lic. Thalia Bustamante
            {/* <Text component="span" color={theme.primaryColor} inherit>
              NÉV
            </Text>
            ! */}
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              Bienvenido al aplicativo Smart Citas de agendamiento de citas y
              pacientes
            </Text>
          </Container>

          <div className={classes.controls}>
            <Link href="/citas" passHref>
              <Button className={classes.control} size="lg">
                Citas
              </Button>
            </Link>
            <Link href="/pacientes" passHref>
              <Button className={classes.control} size="lg">
                Pacientes
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
