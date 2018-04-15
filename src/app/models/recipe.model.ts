import { IIngredient } from "./ingredient.model";
import { ICookingStep } from "./cooking-step.model";
import { IDirection } from "./direction.model";
import { IRatings } from "./ratings.model";
import { ICategory } from "./category.model";

export interface IRecipe {
  id: string;
  title: string;
  description?: string;
  imagePath:string;
  ingredients: IIngredient[];
  directions: IDirection;
  cookingSteps: ICookingStep[];
  rating?: IRatings;
  video?: string;
  category?: ICategory
}
