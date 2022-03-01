import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "next/app";
import Head from "next/head";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const darkTheme = extendTheme({ config });

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      {/* <Head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOGGLE_ADSENSE}`}
          crossOrigin="anonymous"
        ></script>
      </Head> */}
      <ChakraProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default MyApp;
