import Head from "next/head";
import { useState } from "react";
import { MantineProvider, AppShell, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { StoreProvider } from "easy-peasy";
import { store } from "../util/store/store";
import InicioLayout from "../util/components/inicioLayout";
import Home from ".";

function Application({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <>
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
        <meta
          name="google-site-verification"
          content="A-hWPVd5Unw24f6yeXjp3guglWLGkaitLIA30OB5EIw"
        />
        <link rel="icon" href="/abc.png" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme}>
        <MantineProvider
          theme={{ colorScheme }}
          withNormalizeCSS
          withGlobalStyles
        >
          <Home />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

Application.authPage = true;

export default Application;
