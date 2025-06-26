'use client';

import { register } from '@/app/api/register/route';
import { AuthenticationFormCategoryEnum, CredentialsDataType } from '@/models';
import { messages } from '@/resources';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { FC, useState } from 'react';
import { CredentialForm } from './credential-form';
import { SignInProviderCard } from './sign-in-provider-card';

type AuthenticationProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

export const Authentication: FC<AuthenticationProps> = ({ providers }) => {
  const [signInMode, setSignInMode] = useState(true);

  const handleSignUp = async (credentials: CredentialsDataType) => {
    await register(credentials)
      .then((e) => console.log('Registration successful:', e))
      .catch(() => {
        console.error('Registration error');
      });
  };

  return (
    <div className="w-full max-w-full flex-col flex-center gap-2">
      {signInMode ? (
        providers && (
          <div className="w-full max-w-full flex-col flex-center gap-2">
            {Object.values(providers).map((provider) => (
              <SignInProviderCard key={provider.name} provider={provider} />
            ))}
          </div>
        )
      ) : (
        <CredentialForm category={AuthenticationFormCategoryEnum.SIGN_UP} onSubmitClick={handleSignUp} />
      )}
      <button type="button" onClick={() => setSignInMode((prev) => !prev)} className="black_btn">
        {signInMode ? messages.createAccount : messages.signIn}
      </button>
    </div>
  );
};
