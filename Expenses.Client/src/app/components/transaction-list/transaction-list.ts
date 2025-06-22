import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../models/itransaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList implements OnInit {
  transactions: ITransaction[] = [];

constructor(private transactionService: TransactionService, private router: Router) { }


  ngOnInit(): void {
    this.loadTransactions();
  }
  loadTransactions(): void {
    this.transactionService.getAll().subscribe((data) => {
      console.log('oncreate -', data)

      this.transactions = data
    }
  );
  }
  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'Income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }
  getTotalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'Expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }
  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  editTransaction(transaction: ITransaction){
    if(transaction.id){
      this.router.navigate(['/edit/', transaction.id]);
    }
  }
  deleteTransaction(transaction: ITransaction){
    if(transaction.id){
      if(confirm('Are you sure you want to delete this transaction?')){
        this.transactionService.delete(transaction.id).subscribe({
          next: () => {
          this.loadTransactions();
          },
          error: (error) => {
            console.error('Error deleting transaction:', transaction);
          }
        });
      }
    }
  }
}
