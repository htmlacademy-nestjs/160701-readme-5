export interface Comment {
  id?: string;
  createdAt?: Date;
  message: string;
  postId: string;
  userId: string;
}
