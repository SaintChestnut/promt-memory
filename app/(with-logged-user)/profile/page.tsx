'use client';

import { Profile as ProfileComponent } from '@/components';
import { PromptPostType } from '@/models';
import { apiRoutes, pageRoutes, searchParams } from '@/resources';
import { routeWithParams } from '@/utils';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PromptPostType[]>([]);
  const [initialRender, setInitialRender] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const userId = (session?.user as Session & { id: string })?.id;

    if (!userId) return;
    if (!initialRender) return;
    setFetching(true);
    (async () => {
      const response = await fetch(routeWithParams(apiRoutes.USER_POSTS, { userId }));
      const data = await response.json();
      setPosts(data);
      setInitialRender(false);
      setFetching(false);
    })();
  }, [initialRender, session?.user]);

  const deletePostHandler = async (post: PromptPostType) => {
    const isConfirmed = confirm('Are you sure you want to delete this promt?');

    if (isConfirmed) {
      await fetch(routeWithParams(apiRoutes.PROMPT_BY_ID, { promptId: post._id }), {
        method: 'DELETE'
      }).then((response) => {
        if (!response.ok) {
          return;
        }
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      });
    }
  };

  const editPostHandler = (post: PromptPostType) => {
    router.push(`${pageRoutes.EDIT_PROMPT}?${searchParams.PROMPT_ID}=${post._id}`);
  };

  if (fetching) {
    return <Image src="/assets/icons/loader.svg" alt="loading" width={40} height={40} className="object-contain" />;
  }

  return (
    <ProfileComponent
      name="My"
      description="Description"
      posts={posts}
      editHandler={editPostHandler}
      deleteHandler={deletePostHandler}
    />
  );
};

export default Profile;
