import Head from "next/head";
import { useState } from "react";
import { MantineProvider, AppShell, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { StoreProvider } from "easy-peasy";
import { store } from "../util/store/store";
import InicioLayout from "../util/components/inicioLayout";

function Application({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme}>
        <MantineProvider
          theme={{ colorScheme }}
          withNormalizeCSS
          withGlobalStyles
        >
          <NotificationsProvider>
            <ModalsProvider>
              <StoreProvider store={store}>
                {Component.authPage ? (
                  <Component {...pageProps} />
                ) : (
                  <InicioLayout>
                    <Component {...pageProps} />
                  </InicioLayout>
                )}
              </StoreProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default Application;
