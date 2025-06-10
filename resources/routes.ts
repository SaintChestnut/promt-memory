export type PageRoutesType = 'HOME' | 'CREATE_PROMPT' | 'EDIT_PROMPT' | 'PROFILE' | 'NO_USER';

export const pageRoutes: Record<PageRoutesType, string> = {
  HOME: '/',
  CREATE_PROMPT: '/create-prompt',
  EDIT_PROMPT: '/edit-prompt',
  PROFILE: '/profile',
  NO_USER: '/no-user'
};

export type ApiRoutesType = 'NEW_PROMPT' | 'PROMPT_BY_ID' | 'USER_POSTS' | 'ALL_PROMPTS';

export const apiRoutes: Record<ApiRoutesType, string> = {
  ALL_PROMPTS: '/api/prompt',
  NEW_PROMPT: '/api/prompt/new',
  PROMPT_BY_ID: '/api/prompt/[promptId]',
  USER_POSTS: '/api/users/[userId]/posts'
};

export type SearchParamsType = 'PROMPT_ID' | 'PROMPT_TAG';

export const searchParams: Record<SearchParamsType, string> = {
  PROMPT_ID: 'promptId',
  PROMPT_TAG: 'promptTag'
};
