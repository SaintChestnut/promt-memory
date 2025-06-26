'use client';

import { ModalContext } from '@/context';
import { messages, pageRoutes } from '@/resources';
import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  getProviders as getAuthProviders,
  LiteralUnion,
  signOut,
  useSession
} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Authentication, Modal } from '.';

export const Nav = () => {
  const { data: session } = useSession();
  const [authProviders, setAuthProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { toggle: toggleModal, onClose: onCloseModal, isOpen } = useContext(ModalContext);

  useEffect(() => {
    (async () => {
      const res = await getAuthProviders();
      setAuthProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={pageRoutes.HOME} className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="logo" width={40} height={40} className="object-contain" />
        <p className="logo_text">{messages.navigationBar.logoText}</p>
      </Link>
      {session?.user ? (
        <>
          {/* web */}
          <div className="sm:flex hidden">
            <div className="flex gap-3 md:gap-5">
              <Link href={pageRoutes.CREATE_PROMPT} className="black_btn">
                {messages.navigationBar.buttons.createPromt}
              </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">
                {messages.navigationBar.buttons.signOut}
              </button>
              <Link href={pageRoutes.PROFILE}>
                <Image
                  src={session?.user?.image || '/assets/images/logo.svg'}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
          {/* mobile */}
          <div className="sm:hidden flex relative">
            <div className="flex">
              <Image
                src={session?.user?.image || '/assets/images/logo.svg'}
                alt="logo"
                className="rounded-full"
                width={40}
                height={40}
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link href={pageRoutes.PROFILE} className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    {messages.navigationBar.buttons.myProfile}
                  </Link>
                  <Link
                    href={pageRoutes.CREATE_PROMPT}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                    {messages.navigationBar.buttons.createPromt}
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}>
                    {messages.navigationBar.buttons.signOut}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <button type="button" onClick={() => toggleModal && toggleModal()} className="outline_btn">
            {messages.signIn}
          </button>
          <Modal show={isOpen} onCloseButtonClick={onCloseModal}>
            <Authentication providers={authProviders} />
          </Modal>
        </>
      )}
    </nav>
  );
};
