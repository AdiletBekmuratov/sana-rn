export interface IUser {
  access: string;
  refresh: string;
}

export interface IAuth {
  user?: IUser;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message?: string;
}
