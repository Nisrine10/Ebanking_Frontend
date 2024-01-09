import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountsComponent} from "./accounts/accounts.component";
import {CustomersComponent} from "./customers/customers.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {HomeComponent} from "./home/home.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";

const routes: Routes = [
  {path :"customers", component:CustomersComponent},
  {path:"accounts", component:AccountsComponent},
  {path:"new-customer", component:NewCustomerComponent},
  {path:"home", component:HomeComponent},
  {path:"customer-accounts/:id", component:CustomerAccountsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
