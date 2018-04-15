import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { IRecipe } from '../models/recipe.model';


@Injectable()
export class RecipeService {
  recipesCollection: AngularFirestoreCollection<IRecipe>;
  recipesDoc: AngularFirestoreDocument<IRecipe>;
  recipes: Observable<IRecipe[]>;
  client: Observable<IRecipe>;

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

}
