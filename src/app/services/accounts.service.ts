import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../environments/environment";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }
  //-----------------------ListeAccount------------------------------------
  public getAccount(accountId:string ,page:number, size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  //-----------------------debitOperation------------------------------------
  public debit(accountId:string ,amount:number, description:string){
    let data1= {accountId:accountId , amount:amount, description :description};
    return this.http.post(environment.backendHost+"/accounts/debit",data1);
  }
//-----------------------creditOperation------------------------------------
    public credit(accountId:string ,amount:number, description:string){
        let data2= {accountId:accountId , amount:amount, description :description};
        return this.http.post(environment.backendHost+"/accounts/credit",data2);
    }
//-----------------------transferOperation------------------------------------
    public transfer(accountSource:string ,accountDestination:string,amount:number, description:string){
        let data3= {accountSource ,accountDestination, amount, description};
        return this.http.post(environment.backendHost+"/accounts/transfer",data3);
    }

}
