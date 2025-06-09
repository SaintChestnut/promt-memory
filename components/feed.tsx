'use client';

import { PromptPostType } from '@/models';
import { apiRoutes, searchParams } from '@/resources';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { PromptCardList } from './prompt-card-list';

export const Feed = () => {
  const urlSearchParams = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<PromptPostType[]>([]);
  const [initialRender, setInitialRender] = useState(true);
  const [fetching, setFetching] = useState(false);

  const filteredPosts = posts.filter((post) => {
    if (post.promptText.search(new RegExp(searchText, 'i')) !== -1) return true;
    if (post.tag.search(new RegExp(searchText, 'i')) !== -1) return true;
    if (post.creator.email.search(new RegExp(searchText, 'i')) !== -1) return true;
    return false;
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Search text changed:', event.target.value);
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const promptTag = urlSearchParams.get(searchParams.PROMPT_TAG);
    if (promptTag) setSearchText(promptTag);
  }, [urlSearchParams]);

  useEffect(() => {
    if (!initialRender) return;
    setFetching(true);
    (async () => {
      try {
        const response = await fetch(apiRoutes.ALL_PROMPTS);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
      setFetching(false);
      setInitialRender(false);
    })();
  }, [initialRender]);

  return (
    <section className="feed">
      {fetching ? (
        <Image src="/assets/icons/loader.svg" alt="loading" width={40} height={40} className="object-contain" />
      ) : (
        <>
          <form className="relative w-full flex-center">
            <input
              type="text"
              placeholder="Search for a tag or a username"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="search_input peer"
            />
          </form>
          <PromptCardList posts={filteredPosts} handleTagClick={() => console.log('click')} />
        </>
      )}
    </section>
  );
};
