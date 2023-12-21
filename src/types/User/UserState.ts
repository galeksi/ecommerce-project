import { User } from "./User";

export interface UserState {
  users: User[];
  currentUser?: User;
  loading: boolean;
  error: string;
  success: string;
}
