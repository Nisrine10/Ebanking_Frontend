import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']

})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationsFormGroup!: FormGroup;
  errorMessage!:string;

  constructor(private fb: FormBuilder, private accountService: AccountsService) {
  }

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationsFormGroup = this.fb.group({
      accountDestination: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      operationType: [null],

    })
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
        catchError(err=>{
            this.errorMessage=err.message;
            return throwError(err);

      })

    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId :string = this.accountFormGroup.value.accountId;
    let operationType =this.operationsFormGroup.value.operationType;
    let amount :number =this.operationsFormGroup.value.amount;
    let description :string =this.operationsFormGroup.value.description;
    let accountDestination :string =this.operationsFormGroup.value.accountDestination;


    if(operationType=='DEBIT'){
      this.accountService.debit(accountId,amount,description).subscribe({


          next:(data)=>{
            alert("Success Debit Operation");
              this.operationsFormGroup.reset();
            this.handleSearchAccount();
          },
          error:(err)=>{
            console.log(err);
          }
      });

    }else if(operationType=='CREDIT'){
        this.accountService.credit(accountId,amount,description).subscribe({


            next:(data)=>{
                alert("Success Credit Operation");
                this.operationsFormGroup.reset();
                this.handleSearchAccount();
            },
            error:(err)=>{
                console.log(err);
            }
        });

    }else if (operationType === 'TRANSFER') {
        this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
            next: (data) => {
                alert("Success Transfer Operation");
                this.operationsFormGroup.reset();
                this.handleSearchAccount();
            },
            error: (err) => {
                console.log(err);
            }
        });
        }


    }


}
