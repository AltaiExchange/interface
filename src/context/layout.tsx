import React, { ReactNode } from 'react';
import { Web3Provider } from './web3Provider';
import { NextUIProvider } from '@nextui-org/react';

import Header from '@/components/headers';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Web3Provider>
      <NextUIProvider>
        <Header />
        {children}
      </NextUIProvider>
    </Web3Provider>
  );
}
