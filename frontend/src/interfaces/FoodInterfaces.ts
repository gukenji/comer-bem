export interface IFood {
  brand?: string | null;
  name?: string;
  portion_size: number | string;
  is_custom_portion: boolean;
  portion_description: string | null;
  kcal: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
  user: number | undefined;
}
export interface IGetFood extends IFood {
  id: number;
}

export interface IFoodList {
  food_list: IFood[] | null;
  error: string | null;
  refreshed: boolean;
}
