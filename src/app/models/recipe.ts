import { IIngredient } from "./ingredient";
import { ICookingStep } from "./cooking-step";
import { IDirection } from "./direction";
import { IRatings } from "./ratings";
import { ICategory } from "./category";

export interface IRecipe {
  id: string,
  title: string,
  description?: string,
  Image:string,
  ingredients: IIngredient[],
  direction: IDirection,
  cookingSteps: ICookingStep[],
  rating?: IRatings,
  video?: string,
  categoey?: ICategory
}
