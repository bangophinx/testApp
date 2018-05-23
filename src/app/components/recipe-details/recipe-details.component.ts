import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipe.model';
import { IIngredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { ICookingStep } from '../../models/cooking-step.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: IRecipe;
  recipeId: string;
  ingredients: IIngredient[] = [];
  ingredientIds: string[] = [];
  cookingSteps: ICookingStep[];
  favoured = false;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];
    this.recipeService.getRecipe(this.recipeId).subscribe(
      recipe => {
        this.recipe = recipe;
        this.cookingSteps = recipe.cookingSteps;
        recipe.ingredients.forEach(ingredient => {
          this.recipeIngredients(ingredient.id);
        });
      }
    );
  }

  recipeIngredients(id) {
    this.ingredientService.getIngredient(id).subscribe(
      ingredient => {
        this.ingredients.push(ingredient);
      }
    );
  }

  recipeFavoured() {
    this.favoured = !this.favoured;
  }

}
