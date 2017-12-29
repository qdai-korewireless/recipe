import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}


    storeRecipes() {
        return this.http.put('https://recipe-e542e.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        this.http.get('https://recipe-e542e.firebaseio.com/recipes.json')
        .map(
            (res: Response) => {
                const recipes = res.json();
                for (let r of recipes) {
                    if (!r['ingredients']) {
                        r['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe( (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);

        } );
    }
}