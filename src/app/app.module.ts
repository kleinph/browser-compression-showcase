import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxFilesizeModule } from 'ngx-filesize';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgxFilesizeModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
