import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { HttpClientModule } from '@angular/common/http';
import { MewClientComponent } from './mew-client/mew-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageClientComponent,
    MewClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
