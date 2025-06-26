'use client';

import { AuthenticationModal } from '@/components';
import { messages } from '@/resources';

const NoUser = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">{messages.noUser.header}</h1>
      <br className="max-md:hidden" />
      <AuthenticationModal />
    </section>
  );
};

export default NoUser;
