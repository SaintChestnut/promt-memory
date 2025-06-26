import { ActionsType } from '@/models';
import { PromptType } from '@/models/prompt';
import { messages } from '@/resources';
import Link from 'next/link';
import { FC, FormEvent } from 'react';

type FormProps = {
  type: ActionsType;
  post: PromptType;
  setPost: (post: PromptType) => void;
  submitting: boolean;
  handleSubmit: (params: FormEvent<HTMLFormElement>) => Promise<void>;
};

type TypeTranslationType = {
  [K in ActionsType as K]: string;
};

const TypeMessage: TypeTranslationType = {
  create: 'Create',
  edit: 'Edit'
};

export const Form: FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {TypeMessage[type]} {messages.createForm.header}
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} {messages.createForm.description}
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold taxt-base text-gray-700">{messages.createForm.promt.label}</span>
          <textarea
            value={post.promptText}
            onChange={(e) => setPost({ ...post, promptText: e.target.value })}
            placeholder={messages.createForm.promt.placeholder}
            required
            className="form_textarea bg-white"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold taxt-base text-gray-700">{messages.createForm.tag.label}</span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder={messages.createForm.tag.placeholder}
            required
            className="form_input bg-white"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            {messages.createForm.cancelButton}
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${TypeMessage[type]}ing...` : TypeMessage[type]}
          </button>
        </div>
      </form>
    </section>
  );
};
