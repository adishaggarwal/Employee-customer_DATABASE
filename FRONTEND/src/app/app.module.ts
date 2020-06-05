import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { OperationsComponent } from './operations/operations.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';


const appRoutes: Routes =[
  {path:'customers',component:CustomersComponent},
  {path:'users',component:OperationsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    OperationsComponent,
    CustomersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
