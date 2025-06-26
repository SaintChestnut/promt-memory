'use client';

import { messages, pageRoutes } from '@/resources';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NoUser = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const router = useRouter();

  const signInHandler = async (providerId: string) => {
    await signIn(providerId, { callbackUrl: pageRoutes.PROFILE });
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">{messages.noUser.header}</h1>
      <br className="max-md:hidden" />
      {providers &&
        Object.values(providers).map((provider) => (
          <button key={provider.name} type="button" onClick={() => signInHandler(provider.id)} className="black_btn">
            {provider.name}
          </button>
        ))}
    </section>
  );
};

export default NoUser;
