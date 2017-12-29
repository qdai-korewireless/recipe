import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}


    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://recipe-e542e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();
        this.http.get('https://recipe-e542e.firebaseio.com/recipes.json?auth=' + token)
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