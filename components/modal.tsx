'use client';

import { FC } from 'react';
import { Portal } from '.';

type ModalProps = {
  show: boolean;
  onCloseButtonClick: () => void;
  children?: React.ReactNode;
};

export const Modal: FC<ModalProps> = ({ show, onCloseButtonClick, children }) => {
  if (!show) {
    return null;
  }

  return (
    <Portal>
      <div
        className="modal-wrapper"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onCloseButtonClick();
          }
        }}>
        <div className="modal">
          <div className="modal-header">
            <button onClick={onCloseButtonClick}>Close Modal</button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </Portal>
  );
};
