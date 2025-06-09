'use client';

import { pageRoutes } from '@/resources';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={pageRoutes.HOME} className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="logo" width={40} height={40} className="object-contain" />
        <p className="logo_text">Prompt Memory</p>
      </Link>
      {session?.user ? (
        <>
          {/* web */}
          <div className="sm:flex hidden">
            <div className="flex gap-3 md:gap-5">
              <Link href={pageRoutes.CREATE_PROMPT} className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">
                Sign Out
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
                    My Profile
                  </Link>
                  <Link
                    href={pageRoutes.CREATE_PROMPT}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button key={provider.name} type="button" onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
        </>
      )}
    </nav>
  );
};
