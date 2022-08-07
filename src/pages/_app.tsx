import React from "react"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"
import Head from "next/head"
import { makeServer } from "../services/mirage"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "../services/queryClient"

if(process.env.NODE_ENV === "development") {
  makeServer();
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
          </Head>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
    
  )
}

export default MyApp
