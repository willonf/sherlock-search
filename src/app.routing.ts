import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from "./components/search/search.component";

const COMPONENTS_ROUTES: Routes = [
  {path: "", redirectTo: "search", pathMatch: "full"},
  {path: "search", component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(COMPONENTS_ROUTES)],
  exports: [RouterModule]
})
export class AppRouting {
  private readonly _routes: Routes;

  constructor() {
    this._routes = COMPONENTS_ROUTES;
  }

  get routes(): Routes {
    return this._routes;
  }
}
