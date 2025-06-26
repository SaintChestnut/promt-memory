'use client';

import { AuthenticationFormCategoryEnum, AuthenticationProvidersEnum } from '@/models';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { FC } from 'react';
import { CredentialForm } from './credential-form';

type PropsType = {
  provider: ClientSafeProvider;
};

export const SignInProviderCard: FC<PropsType> = ({ provider }) => {
  if (provider.id === AuthenticationProvidersEnum.CREDENTIALS) {
    return (
      <CredentialForm
        category={AuthenticationFormCategoryEnum.SIGN_IN}
        onSubmitClick={async (credentials) => await signIn(provider.id, credentials)}
      />
    );
  }

  return (
    <button type="button" onClick={() => signIn(provider.id)} className="black_btn">
      {provider.name}
    </button>
  );
};
