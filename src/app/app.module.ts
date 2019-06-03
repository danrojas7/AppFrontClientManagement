import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // Se utiliza el routing 
import { FormsModule } from '@angular/forms'; // Se utiliza para implementar el two-way data binding

import { AppComponent } from './app.component';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { HttpClientModule } from '@angular/common/http';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';
import { APP_ROUTING } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ManageClientComponent,
    ComingSoonComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
