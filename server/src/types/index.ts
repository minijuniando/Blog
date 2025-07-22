export type ErrorSchema = {
  error: boolean;
  status: number;
  message: string;
};

export type LikeSchema = {
  userId: string;
  articleId: string;
};
