'use client';

import { PromptPostType } from '@/models';
import { messages, pageRoutes, searchParams } from '@/resources';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

type PromptCardProps = {
  post: PromptPostType;
  onTagClick: (tag: string) => void;
  onEditClick?: (post: PromptPostType) => void;
  onDeleteClick?: (post: PromptPostType) => void;
};

export const PromptCard: FC<PromptCardProps> = ({ post, onTagClick, onEditClick, onDeleteClick }) => {
  const [copiedPrompt, setCopiedPrompt] = useState('');

  const urlSearchParams = useSearchParams();
  const { push } = useRouter();

  const copyHandler = () => {
    setCopiedPrompt(post.promptText);
    navigator.clipboard.writeText(post.promptText);
    setTimeout(() => setCopiedPrompt(''), 3000);
  };

  const tagClickHandler = () => {
    if (onTagClick) onTagClick(post.tag);
    const params = new URLSearchParams(urlSearchParams);
    params.set(searchParams.PROMPT_TAG, post.tag);
    push(`${pageRoutes.HOME}?${params.toString()}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={post.creator.image} alt="user" width={40} height={40} className="rounded-full" />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm wrap-anywhere text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={copyHandler}>
          <Image
            src={copiedPrompt === post.promptText ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.promptText}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={tagClickHandler}>
        {post.tag}
      </p>
      {(onEditClick || onDeleteClick) && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          {onEditClick && (
            <p className="font-inter text-sm green_gradient cursor-pointer" onClick={() => onEditClick(post)}>
              {messages.promtCard.buttons.edit}
            </p>
          )}
          {onDeleteClick && (
            <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={() => onDeleteClick(post)}>
              {messages.promtCard.buttons.delete}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
