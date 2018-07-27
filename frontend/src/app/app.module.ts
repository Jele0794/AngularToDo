import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent, routes } from './app.component';
import { 
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatSelectModule
} from '@angular/material';
import { TodoComponent } from './todo/todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_PROVIDERS } from './app.providers';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

export const MATERIAL_COMPONENTS = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatSelectModule,
  MatIconModule
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MATERIAL_COMPONENTS,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    MATERIAL_COMPONENTS,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
