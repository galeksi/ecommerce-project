import { User } from "./User";

export interface CurrentUser {
  user: User;
  token: string;
}
