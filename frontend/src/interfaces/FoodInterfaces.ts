export interface IFood {
  brand?: string | null;
  name?: string | null;
  portion_size: number | null | string;
  is_custom_portion: boolean | null;
  portion_description: string | null;
  kcal: number | null | string;
  protein: number | null | string;
  carbs: number | null | string;
  fat: number | null | string;
  user: number | undefined;
}
export interface IFoodList {
  food_list: IFood[] | null;
  error: string | null;
}
