import Head from 'next/head';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>پلن‌های اشتراک | RebLawBot</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
        <div className='mt-20 max-w-lg rounded-2xl bg-white p-8 text-center shadow'>
          <h1 className='mb-4 text-2xl font-bold text-blue-700'>
            پلن‌های اشتراک
          </h1>
          <ul className='mb-6 space-y-4 text-right text-gray-700'>
            <li>
              <strong>یک ماهه:</strong>
              <span className='text-gray-600'>
                ۳۰۰,۰۰۰ تومان یا ۰.۵ TON یا معادل RLC
              </span>
            </li>
            <li>
              <strong>مزایا:</strong>
              <span className='text-gray-600'>
                پاسخ نامحدود به سوالات حقوقی، جستجوی کامل، دسترسی به قوانین و
                پرونده‌های مهم
              </span>
            </li>
            <li>
              <strong>نحوه خرید:</strong>
              <span className='text-gray-600'>
                پرداخت بانکی یا رمزارز (TON، RLC)
              </span>
            </li>
          </ul>
          <a
            href='https://t.me/RebLCBot'
            className='inline-block rounded bg-blue-600 px-6 py-2 text-lg font-semibold text-white shadow transition hover:bg-blue-700'
            target='_blank'
            rel='noopener noreferrer'
          >
            خرید اشتراک
          </a>
        </div>
      </main>
    </>
  );
}
