import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRouting} from './app.routing';
import {AppComponent} from './app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {NoPreloading, RouterModule} from "@angular/router";
import {SearchComponent} from './components/search/search.component'
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "./shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
    imports: [
        BrowserModule,
        AppRouting,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(new AppRouting().routes, {preloadingStrategy: NoPreloading}),
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        SharedModule.forRoot(),
        MatButtonModule,
        MatTableModule,
        MatDividerModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
