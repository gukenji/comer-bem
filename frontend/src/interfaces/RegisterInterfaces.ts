export interface IRegisterFirstStep {
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
}

export interface IRegisterSecondStep {
  name: string | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  is_male: boolean | null;
  profile_pic: File | null;
}
