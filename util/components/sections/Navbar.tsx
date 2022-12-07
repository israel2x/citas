import { Navbar, Text, createStyles } from "@mantine/core";
import { Home, Mail, Settings, Users } from "react-feather";
import NextLink from "next/link";
import User from "./User";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      marginTop: "60px",
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: "/citas", label: "Citas", icon: IconBellRinging },
  { link: "/pacientes", label: "Pacientes", icon: IconReceipt2 },
  { link: "/personal", label: "Personal", icon: IconFingerprint },
  { link: "/configuraciones", label: "Configuraciones", icon: IconSettings },
];

export default function NavbarComponent(props) {
  const { classes, cx } = useStyles();

  const links = data.map((item) => (
    <NextLink href={item.link} key={item.label}>
      <span
        className={cx(classes.link, {
          [classes.linkActive]: item.label === "active",
        })}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        {item.label}
      </span>
    </NextLink>
  ));

  return (
    <Navbar
      hidden={!props.opened}
      width={{ sm: 190, lg: 220 }}
      hiddenBreakpoint="sm"
      p="md"
      height="100vh"
      style={{ paddingTop: -70 }}
    >
      <Navbar.Section grow>
        {links}
        {/* <NavLink name="Inicio" icon={<Home />} link="/" />
        <NavLink name="Citas" icon={<Users />} link="/citas" />
        <NavLink name="Pacientes" icon={<Users />} link="/users" />
        <NavLink name="Personal" icon={<Mail />} link="/messages" />
        <NavLink name="Configuraciones" icon={<Settings />} link="/settings" /> */}

        {/*  <a href="/settings" style={{ all: "unset", width: "100%" }}>
          <div style={{ position: "absolute", bottom: 0 }}>
            <User />
          </div>
        </a> */}
      </Navbar.Section>
    </Navbar>
  );
}

function NavLink(props) {
  return (
    <a href={props.link} style={{ all: "unset" }}>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
        {props.icon}
        <Text style={{ marginLeft: 10 }}>{props.name}</Text>
      </div>
    </a>
  );
}
