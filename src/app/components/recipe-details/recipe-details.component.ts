import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipe.model';
import { IIngredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: IRecipe;
  recipeId: string;
  ingredient: IIngredient;
  ingredients: IIngredient[];
  ingredientId: string;
  ingredientIds: string[] = [];

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
        this.ingredients = recipe.ingredients;
        this.ingredientId = recipe.ingredients[0].id;
        this.onGetIngredient()
        recipe.ingredients.forEach(ingredient => {
          this.ingredientIds.push(ingredient.id);
        });
        console.log(this.ingredientIds);
      }
    );
  }

  onGetIngredient() {
    this.ingredientService.getIngredient(this.ingredientId).subscribe(
      ingredient => {
        this.ingredient = ingredient;
        console.log(ingredient);
      }
    );
  }

}
