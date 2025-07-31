export type ArticleSchema = {
  id?: string;
  userId: string;
  photoUrl: string;
  title: string;
  content: string;
  tagIds?: string[];
};
