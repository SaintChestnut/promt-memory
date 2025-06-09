export type PromptType = {
  promptText: string;
  tag: string;
};

export type PromptPostType = PromptType & {
  creator: {
    image: string;
    username: string;
    email: string;
    _id: string;
  };
  _id: string;
};
