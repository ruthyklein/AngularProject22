import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { CategoryService } from '../category.service';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { Category } from '../../../models/category.model';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';

@Component({
   selector: 'app-recipe-details',
   templateUrl: './recipe-details.component.html',
   styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
   recipe!: Recipe;
   category!: Category;
   user!: User;
   index!: number | any;
   isLiked: boolean = false;
   currentUserCode!: number;

   constructor(
     private recipeService: RecipeService,
     private categoryService: CategoryService,
     private userService: UserService,
     private route: ActivatedRoute,
     private router: Router
   ) { }

   ngOnInit(): void {
     this.index = this.route.snapshot.queryParamMap.get('index');
     console.log("index", this.index);

     this.currentUserCode = sessionStorage.getItem('userId') ? JSON.parse(sessionStorage.getItem('userId')!) : null;

     this.recipeService.getById(this.index).subscribe({
       next: (res) => {
         this.recipe = res;

         this.categoryService.getById(this.recipe.categoryId).subscribe({
           next: (category) => {
             this.category = category;
             console.log("category",category)
           },
           error: (err) => {
             console.log(err);
           }
         });

          this.userService.getById(this.recipe.userId).subscribe({
           next: (user) => {
             this.user = user;
           },
           error: (err) => {
             console.log(err);
           }
         });
       },
       error: (err) => {
         console.log(err);
       }
     });
   }

   getDifficultyIcons(difficultyLevel: number): number[] {
     return Array(difficultyLevel).fill(0);
   }

   toggleLike() {
     this.isLiked = !this.isLiked;
     setTimeout(() => {
       this.isLiked = false;
     }, 1000);
   }


  
   isCurrentUserRecipeOwner(): boolean {
     return this.currentUserCode !== null && this.currentUserCode === this.recipe.userId;
}


deleteRecipe() {
     if (this.currentUserCode !== null && this.currentUserCode === this.recipe.userId) {
       Swal.fire({
         title: 'Are you sure you want to delete the recipe?',
         text: "It will not be possible to cancel the operation once it has been done",
         icon: 'warning',
         showCancelButton: true,
         cancelButtonColor: '#a77325db',
         confirmButtonColor: '#a77325db',
         confirmButtonText: 'Yes, delete the recipe'
       }).then((result) => {
         if (result.isConfirmed) {
           this.recipeService.deleteRecipe(this.recipe.recipeId).subscribe({
             next: () => {
               Swal.fire(
                 'Deleted!',
                 "The recipe was successfully deleted.",
                 "success"
               );
               // Reference to the list of recipes
               this.router.navigate(['/recipe']);
             },
             error: (err) => {
               console.log(err);
               Swal.fire(
                 'Error!',
                 "An error occurred while deleting the recipe.",
                 'error'
               );
             }
           });
         }
       });
     } else {
       Swal.fire(
         'The user is not authorized',
         'Only the creator of the recipe can delete.',
         'error'
       );
     }
   }

  
}