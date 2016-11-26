import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MatrixComponent }  from './matrix.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MatrixComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
