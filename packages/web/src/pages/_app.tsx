import React from "react";
import type { AppProps } from "next/app";
import { ServiceContextProvider } from "../contexts/ServiceContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { StylesContextProvider } from "../contexts/StylesContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StylesContextProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ServiceContextProvider>
          <Component {...pageProps} />
        </ServiceContextProvider>
      </QueryClientProvider>
    </StylesContextProvider>
  );
};

export default MyApp;
