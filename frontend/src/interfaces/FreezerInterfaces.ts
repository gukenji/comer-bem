import { IFood } from "./FoodInterfaces";

export interface IIncludeToFreezer {
  user: number | undefined;
  food: number;
  quantity: number;
}
export interface IFreezerList {
  food_list: IIncludeToFreezer[] | null;
  error: string | null;
}
