export type ErrorSchema = {
  error: boolean;
  status: number;
  message: string;
};

export type InterationSchema = {
  userId: string;
  articleId: string;
};

export type TagSchema = { articleId: string; id: string; name: string };

export type GithubUserData = {
  id: unknown;
  name: string;
  email: string;
  avatar_url: string;
};

export type JwtPayload = {
  id: string;
  email: string;
};
