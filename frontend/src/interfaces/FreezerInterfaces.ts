import { IFood, IGetFood } from "./FoodInterfaces";

export interface IIncludeToFreezer {
  user: number | undefined;
  food: number;
  quantity: number;
}
export interface IGetFreezer {
  food_list: IFetchFreezer[] | null;
  error: string | null;
}
export interface IInputQuantity {
  food: IGetFood | null;
  value: number | string;
}

export interface IFetchFreezer {
  food: IGetFood;
  id: number;
  quantity: number;
}
