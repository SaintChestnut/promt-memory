'use client';

import { Authentication, Modal } from '@/components';
import { ModalContext } from '@/context';
import { messages } from '@/resources';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, getProviders, LiteralUnion } from 'next-auth/react';
import { FC, useContext, useEffect, useState } from 'react';

export const AuthenticationModal: FC = () => {
  const [authProviders, setAuthProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const { toggle: toggleModal, onClose: onCloseModal, isOpen } = useContext(ModalContext);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setAuthProviders(res);
    })();
  }, []);

  return (
    <>
      <button type="button" onClick={() => toggleModal && toggleModal()} className="outline_btn">
        {messages.signIn}
      </button>
      <Modal show={isOpen} onCloseButtonClick={onCloseModal}>
        <Authentication providers={authProviders} />
      </Modal>
    </>
  );
};
