/**
 * Routing Module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const APP_ROUTES: Routes = [
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];



/**
 * Main module routing
 *
 * contains code related to routing
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
