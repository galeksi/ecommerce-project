import { User } from "./User";

export interface UserState {
  users: User[];
  currentUser?: User;
  token: string;
  loading: boolean;
  error: string;
  success: string;
}
