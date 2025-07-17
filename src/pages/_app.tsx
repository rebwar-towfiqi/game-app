import type { AppProps } from 'next/app';
import { IntlProvider } from 'next-intl';

import '../styles/globals.css';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps, router }: AppProps) {
  // استخراج نام زبان از آدرس (fa/en/ku)
  const locale = router.locale || 'fa';
  return (
    <IntlProvider locale={locale} messages={pageProps.messages}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </IntlProvider>
  );
}

export default MyApp;
