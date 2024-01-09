export interface AccountOperation{
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}
export interface AccountDetails {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pagesize: number;
  accountOperationDTOS: AccountOperation[];
}
