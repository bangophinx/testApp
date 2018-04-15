import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecipeAddComponent } from './components/recipe-add/recipe-add.component';
import { FooterComponent } from './components/footer/footer.component';

import { AuthGuard } from "./guards/auth.guard";
import { RegisterGuard } from './guards/register.guard';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recipe/add', component: RecipeAddComponent},
  {path: 'recipe/:id', component: RecipeDetailsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),    
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule { }

export const routingComponents =
  [
    DashboardComponent, FooterComponent, RecipeDetailsComponent, RecipeListComponent, ShoppingListComponent, LoginComponent, NavbarComponent, NotFoundComponent, RegisterComponent, SettingsComponent, SidebarComponent, RecipeAddComponent
  ]
