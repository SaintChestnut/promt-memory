'use client';

import { ModalContext } from '@/context';
import { useState } from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isOpen, toggle: () => setIsOpen((prev) => !prev), onClose: () => setIsOpen(false) }}>
      {children}
    </ModalContext.Provider>
  );
};
