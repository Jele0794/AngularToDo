import { BrowserModule } from '@angular/platform-browser';
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
  MatProgressBarModule
} from '@angular/material';
import { TodoComponent } from './todo/todo.component';

export const MATERIAL_COMPONENTS = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule
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
    RouterModule.forRoot(routes)
  ],
  exports: [
    MATERIAL_COMPONENTS
  ],
  providers: [],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
