export type ErrorSchema = {
  error: boolean;
  status: number;
  message: string;
};

export type InterationSchema = {
  userId: string;
  articleId: string;
};

export type TagSchema = { id: string; name: string };
