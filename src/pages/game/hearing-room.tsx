'use client';

import dynamic from 'next/dynamic';

const HearingRoom = dynamic(() => import('@/components/HearingRoom'), {
  ssr: false,
});

export default function Page() {
  return <HearingRoom />;
}
