export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserRegisterResponse {
  access_token: string;
}