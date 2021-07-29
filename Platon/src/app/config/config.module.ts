import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigComponent } from './config.component';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    ConfigComponent
  ]
})
export class ConfigModule { }
