'use client';

import { Form } from '@/components/form';
import { ActionsEnum } from '@/models';
import { PromptType } from '@/models/prompt';
import { apiRoutes, pageRoutes } from '@/resources';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const CreatePromt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PromptType>({
    promptText: '',
    tag: ''
  });

  const createHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    let response;

    try {
      response = await fetch(apiRoutes.NEW_PROMPT, {
        method: 'POST',
        body: JSON.stringify({
          promptText: post.promptText,
          tag: post.tag,
          // userId: session?.user?.email
          userId: (session?.user as Session & { id: string }).id
        })
      });
    } catch (error) {
      console.error('Error creating prompt:', error);
    } finally {
      setSubmitting(false);
      setPost({ promptText: '', tag: '' });
    }
    if (response?.ok) {
      router.push(pageRoutes.HOME);
    }
  };

  return (
    <Form
      type={ActionsEnum.CREATE}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createHandler}
    />
  );
};

export default CreatePromt;
