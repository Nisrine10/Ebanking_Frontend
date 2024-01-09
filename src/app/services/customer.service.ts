import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../environments/environment";
import {CustomersComponent} from "../customers/customers.component";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  //-----------------------ListeCustomer------------------------------------
  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers")
  }
  //-----------------------SearchCustomer------------------------------------
  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyword);
  }
//-----------------------SaveCustomer------------------------------------
  public saveCustomers(customer: Customer):Observable<Customer>{
    // @ts-ignore
    return this.http.post<Customer>(environment.backendHost+"/customers",customer);
  }
//-----------------------DeleteCustomer------------------------------------
  public deleteCustomer(id: number){

    return this.http.delete(environment.backendHost+"/customers/"+id);
  }
}
