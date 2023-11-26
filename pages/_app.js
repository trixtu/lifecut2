import Layout from '@/components/Layout'
import GlobalState from '@/context/configuratorContext'
import ShopProvider from '@/context/shopContext'
import { ConfigProvider } from 'antd'
import '@/styles/globals.css'
import theme from '../theme/themeConfig'

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={theme}>
      <GlobalState>
        <ShopProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ShopProvider>
      </GlobalState>
    </ConfigProvider>
  )
}
