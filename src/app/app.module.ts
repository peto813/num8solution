import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

//ANGULAR BOOTSTRAP MODULE
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import {Component, Injectable} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {I18n,NgbDateCuParserFormatter} from  './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: AppComponent}], // define custom NgbDatepickerI18n provider

  bootstrap: [AppComponent]
})
export class AppModule { }
