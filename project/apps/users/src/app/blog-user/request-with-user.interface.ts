import { BlogUserEntity } from "./blog-user.entity";

export interface RequestWithUser {
  user: BlogUserEntity;
}