import { createContext } from 'react';

type ModalContextType = {
  isOpen: boolean;
  onClose: () => void;
  toggle?: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  onClose: () => undefined,
  toggle: () => undefined
});
