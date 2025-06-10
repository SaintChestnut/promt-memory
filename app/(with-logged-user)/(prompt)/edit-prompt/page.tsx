'use client';

import { Form } from '@/components/form';
import { ActionsEnum } from '@/models';
import { PromptType } from '@/models/prompt';
import { apiRoutes, pageRoutes, searchParams } from '@/resources';
import { routeWithParams } from '@/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const EditPrompt = () => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [post, setPost] = useState<PromptType>({
    promptText: '',
    tag: ''
  });

  const promptId = urlSearchParams.get(searchParams.PROMPT_ID);

  const editHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    let response;

    if (!promptId) return;
    try {
      response = await fetch(routeWithParams(apiRoutes.PROMPT_BY_ID, { promptId }), {
        method: 'POST',
        body: JSON.stringify({
          promptText: post.promptText,
          tag: post.tag
        })
      });
    } catch (error) {
      console.error('Error creating prompt:', error);
    } finally {
      setSubmitting(false);
      setPost({ promptText: '', tag: '' });
    }

    if (response?.ok) {
      router.push(pageRoutes.PROFILE);
    }
  };

  useEffect(() => {
    (async () => {
      if (!promptId || !session?.user) return;
      setFetching(true);

      try {
        const response = await fetch(routeWithParams(apiRoutes.PROMPT_BY_ID, { promptId }));
        const promt = await response.json();
        setPost(promt);
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
      setFetching(false);
    })();
  }, [promptId, session?.user]);

  if (!session?.user) {
    router.push(pageRoutes.HOME);
    return;
  }

  if (fetching) {
    return <Image src="/assets/icons/loader.svg" alt="loading" width={40} height={40} className="object-contain" />;
  }

  return (
    <Form type={ActionsEnum.EDIT} post={post} setPost={setPost} submitting={submitting} handleSubmit={editHandler} />
  );
};

export default EditPrompt;
