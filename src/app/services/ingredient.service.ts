import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { IRecipe } from '../models/recipe.model';
import { IIngredient } from '../models/ingredient.model';

@Injectable()
export class IngredientService {
  ingredientsCollection: AngularFirestoreCollection<IIngredient>;
  ingredientDoc: AngularFirestoreDocument<IIngredient>;
  ingredients: Observable<IIngredient[]>;
  ingredient: Observable<IIngredient>;

  constructor(private afs: AngularFirestore) {
     this.ingredientsCollection = this.afs.collection(
      'ingredients', ref => ref.orderBy('name', 'asc')
    );
  }

  getIngredients(): Observable<IIngredient[]> {
    this.ingredients = this.ingredientsCollection.snapshotChanges().map(
      changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as IIngredient;
          data.id = action.payload.doc.id;
          return data;
        });
      }
    );
    return this.ingredients;
  }

  getIngredient(id: string): Observable<IIngredient>{
    this.ingredientDoc = this.afs.doc<IIngredient>(`ingredients/${id}`);
    this.ingredient = this.ingredientDoc.snapshotChanges().map(
      action => {
        if (action.payload.exists === false) {
          return null          
        } else {
          const data = action.payload.data() as IIngredient;
          data.id = action.payload.id;
          return data;
        }
      }
    );
    return this.ingredient;          
  }



}
