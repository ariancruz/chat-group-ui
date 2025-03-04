export interface FormAuth {
  email: string;
  password: string;
}

export interface CreateUser {
  email: string;
  name: string;
  password: string;
}

export interface UserAuthenticated extends Omit<CreateUser, 'password'> {
  accessToken: string;
  refreshToken: string;
  _id: string;
}


export interface UserLight {
  _id: string;
  name: string;
}
