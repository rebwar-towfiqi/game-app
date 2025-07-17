import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>ربات حقوقی RebLawBot</title>
        <meta
          name='description'
          content='ربات هوشمند مشاوره حقوقی مبتنی بر هوش مصنوعی و بلاکچین'
        />
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
        <div className='mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow'>
          <h1 className='mb-4 text-3xl font-bold text-blue-700 md:text-4xl'>
            RebLawBot
          </h1>
          <p className='mb-6 text-lg'>{t('intro_title')}</p>
          <span className='text-sm text-gray-500'>{t('intro_desc')}</span>
          <a
            href='https://t.me/RebLCBot'
            className='mt-6 inline-block rounded bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('go_to_bot')}
          </a>
        </div>
        <footer className='mt-16 text-center text-sm text-gray-400'>
          &copy; {new Date().getFullYear()} RebLawBot. توسعه توسط ریبوار توفیقی.
        </footer>
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;
  const messages = (await import(`@/locales/${locale}/common.json`)).default;

  return {
    props: { messages },
  };
}
