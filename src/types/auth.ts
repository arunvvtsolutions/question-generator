export type UserProps = {
  id: number;
  name: string;
  email: string;
  phone: number
};

export type CreateUserProps = {
  name: string;
  email: string;
  phone: string;
  otp: number;
  role:string
};

export type AuthProps = {
  error?: null | string;
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: null | UserProps;
  phone: string | null;
};
