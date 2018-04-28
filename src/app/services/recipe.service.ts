import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { IRecipe } from '../models/recipe.model';
import { IIngredient } from '../models/ingredient.model';


@Injectable()
export class RecipeService {
  recipesCollection: AngularFirestoreCollection<IRecipe>;
  recipeDoc: AngularFirestoreDocument<IRecipe>;
  recipes: Observable<IRecipe[]>;
  recipe: Observable<IRecipe>;

  constructor(private afs: AngularFirestore) {
    this.recipesCollection = this.afs.collection(
      'recipes', ref => ref.orderBy('title', 'asc')
    );
  }

  getRecipes(): Observable<IRecipe[]> {
    this.recipes = this.recipesCollection.snapshotChanges().map(
      changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as IRecipe;
          data.id = action.payload.doc.id;
          return data;
        });
      }
    );
    return this.recipes;
  }

  getRecipe(id: string): Observable<IRecipe>{
    this.recipeDoc = this.afs.doc<IRecipe>(`recipes/${id}`);
    this.recipe = this.recipeDoc.snapshotChanges().map(
      action => {
        if (action.payload.exists === false) {
          return null          
        } else {
          const data = action.payload.data() as IRecipe;
          data.id = action.payload.id;
          return data;
        }
      }
    );
    return this.recipe;          
  }


}
