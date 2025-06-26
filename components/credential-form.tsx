'use client';
import { AuthenticationFormCategoryEnum, AuthenticationFormCategoryType, CredentialsDataType } from '@/models';
import { FC, useState } from 'react';

type PropsType = {
  category: AuthenticationFormCategoryType;
  onSubmitClick?: (credentials: CredentialsDataType) => void;
};

export const CredentialForm: FC<PropsType> = ({ category, onSubmitClick }) => {
  const [credentials, setCredentials] = useState<CredentialsDataType>({ email: '', password: '' });

  return (
    <section className="w-full max-w-full ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitClick?.(credentials);
          setCredentials({ email: '', password: '' });
        }}
        className="m-2 w-auto max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold taxt-base text-gray-700">Email</span>
          <input
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            className="form_input bg-white"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold taxt-base text-gray-700">Password</span>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            className="form_input bg-white"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            // disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {category === AuthenticationFormCategoryEnum.SIGN_IN ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    </section>
  );
};
