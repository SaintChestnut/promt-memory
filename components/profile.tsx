import { PromptPostType } from '@/models';
import { FC } from 'react';
import { PromptCard } from '.';

type ProfileProps = {
  name: string;
  description?: string;
  posts: PromptPostType[];
  editHandler: (post: PromptPostType) => void;
  deleteHandler: (post: PromptPostType) => void;
};

export const Profile: FC<ProfileProps> = ({ name, description, posts, editHandler, deleteHandler }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            onTagClick={() => console.log('click tag')}
            onEditClick={editHandler}
            onDeleteClick={deleteHandler}
          />
        ))}
      </div>
    </section>
  );
};
