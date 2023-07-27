import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
