import Layout from '@/components/Layout'
import GlobalState from '@/context/configuratorContext'
import ShopProvider from '@/context/shopContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <GlobalState>
      <ShopProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShopProvider>
    </GlobalState>
  )
}
