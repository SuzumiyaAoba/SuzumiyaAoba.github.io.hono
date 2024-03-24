type Post = {
  id: string;
  title: string;
  slug: string;
  createdAt: {
    year: number;
    month: number;
    date: number;
  };
  draft: boolean;
  categories: string[];
  tags: string[];
  html: string;
};

type GetPostsOptions = {
  draft: boolean;
}

export const DEFAULT_GET_POSTS_OPTIONS: GetPostsOptions = {
  draft: false,
} as const;

interface PostRegistory {

  getPosts(options?: GetPostsOptions): Promise<Post[]>;

  getPost(id: string): Promise<Post | undefined>;
}

export type { Post, PostRegistory, GetPostsOptions };
