import { IFood } from "./FoodInterfaces";

export interface IFreezer {
  user: number | undefined;
  food: IFood;
  quantity: number | string;
}
export interface IFreezerList {
  food_list: IFreezer[] | null;
  error: string | null;
}
