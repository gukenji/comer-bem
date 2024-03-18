import { IGetFood } from "./FoodInterfaces";

export interface IIncludeToInventory {
  user: number | undefined;
  food: number;
  quantity: number;
}
export interface IGetInventory {
  food_list: IFetchInventory[] | null;
  error: string | null;
  refreshed: boolean;
}
export interface IInputQuantity {
  food: IGetFood | null;
  value: number | string;
}

export interface IFetchInventory {
  food: IGetFood;
  id: number;
  quantity: number;
}
