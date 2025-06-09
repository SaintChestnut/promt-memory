import { PromptPostType } from '@/models';
import { FC } from 'react';
import { PromptCard } from './prompt-card';

type PromptCardListProps = {
  posts: PromptPostType[];
  handleTagClick: (tag: string) => void;
};

export const PromptCardList: FC<PromptCardListProps> = ({ posts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard key={post._id} post={post} onTagClick={handleTagClick} />
      ))}
    </div>
  );
};
