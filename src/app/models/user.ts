export interface FormAuth {
  email: string;
  password: string;
}

export interface UserAuthenticated {
  accessToken: string;
  email: string;
  name: string;
  id: string;
}
