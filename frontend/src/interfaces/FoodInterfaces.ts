export interface IFood {
  brand?: string | null;
  name?: string | null;
  portion_size: number | null;
  is_custom_portion: boolean | null;
  portion_description: string | null;
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  user: number | undefined;
}
export interface IFoodList {
  food_list: IFood[] | null;
  error: string | null;
}
