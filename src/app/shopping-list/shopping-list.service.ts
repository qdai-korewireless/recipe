import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apple', 1),
        new Ingredient('Orange', 1)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        // since we return copy of ingredients in getIngredients method, we can use this event to push to subscribers
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients.push(...ings);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}