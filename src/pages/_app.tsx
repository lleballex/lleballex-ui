import type { AppProps } from 'next/app'
import { Site } from '@/config/site'
import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Toasts, { ToastsProvider } from '@/components/layout/Toasts'
import '@/assets/css/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{Site.name}</title>
        <link rel="icon" type={Site.favicon.type} href={Site.favicon.href} />
      </Head>

      <ToastsProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Toasts />
      </ToastsProvider>
    </>
  )
}
