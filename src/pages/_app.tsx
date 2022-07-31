import React from "react"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>    
  )
}

export default MyApp
