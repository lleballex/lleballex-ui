import type { AppProps } from 'next/app'
import { Site } from '@/config/site'
import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/assets/css/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{Site.name}</title>
        <link rel="icon" type={Site.favicon.type} href={Site.favicon.href} />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
