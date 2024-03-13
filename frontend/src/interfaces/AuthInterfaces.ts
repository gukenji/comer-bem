export interface IJWTDecode {
  user_id: number;
  token_type: string;
  exp: string;
  name: string;
  superuser: boolean;
  staff: boolean;
  height: number;
  weight: number;
  age: number;
  is_male: boolean;
  level: number;
}
export interface ITokenInfo {
  refresh: string;
  access: string;
}

export interface IUserData {
  name: string;
  user_id: number;
  superuser: boolean;
  staff: boolean;
  height: number;
  weight: number;
  age: number;
  is_male: boolean;
  level: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}
