import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {Form, FormBuilder, FormGroup, isFormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent implements OnInit{
  customers!:Observable<Array<Customer>>;
  errorMessage!:object;
  searchFormGroup :FormGroup | undefined;
  constructor(private customerService:CustomerService, private fb:FormBuilder, private router:Router) {} //injection de dependances au niveau de contructeur

  //------------------meth s'executant au demarrage------------------
  ngOnInit() {
    this.searchFormGroup=this.fb.group({

      keyword:this.fb.control("")

    });
    this.handleSearchCustomers();
  }

//-----------------------SearchCustomer------------------------------------
  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }
//-----------------------DeleteCustomer------------------------------------
  handleDeleteCustomer(c:Customer) {

    let conf = confirm("Are you sure?");
    if(!conf) return;

    this.customerService.deleteCustomer(c.id).subscribe({

      next:(resp)=>{
        //------supprimer la ligne du tableau------
        this.customers = this.customers.pipe(
          map(data=>{
            //-------je prends l'index de l'element surlequel je click-----
           let index=data.indexOf(c);
           //-----supprimer l'element------
           data.slice(index,1);
            return data;
          })
        );

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

    handleCustomerAccounts(customer: Customer) {
        this.router.navigateByUrl("/customer-accounts/"+customer.id,{state:customer});
    }
}


