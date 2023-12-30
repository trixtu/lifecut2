import Layout from '@/components/Layout'
import GlobalState from '@/context/configuratorContext'
import ShopProvider from '@/context/shopContext'
import { ConfigProvider } from 'antd'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/theme'



export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ConfigProvider >
        <GlobalState>
          <ShopProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ShopProvider>
        </GlobalState>
      </ConfigProvider>
    </ChakraProvider>
  )
}
