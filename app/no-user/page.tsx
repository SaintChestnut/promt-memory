'use client';

import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

const NoUser = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">No logged user in session</h1>
      <br className="max-md:hidden" />
      {providers &&
        Object.values(providers).map((provider) => (
          <button key={provider.name} type="button" onClick={() => signIn(provider.id)} className="black_btn">
            Sign In
          </button>
        ))}
    </section>
  );
};

export default NoUser;
