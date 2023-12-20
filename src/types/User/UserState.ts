import { CurrentUser } from "./CurrentUser";
import { User } from "./User";

export interface UserState {
  users: User[];
  currentUser?: CurrentUser;
  loading: boolean;
  error: string;
  success: string;
}
