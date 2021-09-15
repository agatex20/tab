import { UserResponse } from './userResponse';

export interface AuthResponse {
  loggedUser: UserResponse;
  token: string;
  success: boolean;
  errors: string[];
}
