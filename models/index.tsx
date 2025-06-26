export * from './form';
export * from './prompt';

export const authenticationProviders = ['google', 'credentials'] as const;

export type AuthenticationProvidersType = (typeof authenticationProviders)[number];

export enum AuthenticationProvidersEnum {
  GOOGLE = 'google',
  CREDENTIALS = 'credentials'
}

export type AuthenticationFormCategoryType = 'signIn' | 'signUp';

export enum AuthenticationFormCategoryEnum {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp'
}

export type CredentialsDataType = {
  email: string;
  password: string;
};
