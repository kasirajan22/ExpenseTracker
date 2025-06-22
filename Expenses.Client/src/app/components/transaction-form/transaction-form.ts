import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm implements OnInit {

  transactionForm: FormGroup;
  incomeCategotries=[
    'Salary',
    'Freelance',
    'Investment',
  ]
  expenseCategotries=[
    'Food',
    'Travel',
    'Entertainment',
  ]

  availableCategories: string[] = [];

  editMode = false;
  transactionId?: number;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private transactionService: TransactionService){

    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      amount:['', [Validators.required, Validators.min(0)]],
      createdAt:[new Date(), Validators.required],
    })
  }
  ngOnInit(): void {
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(type);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.editMode = true;
      this.transactionId = +id;

      this.loadTransaction(this.transactionId);
    }
  }
  cancel(){
    this.router.navigate(['/transactions']);
  }
  loadTransaction(id: number): void{
    this.transactionService.getById(id).subscribe({
      next: (data) => {
        console.log("loadTransaction", data);
        this.updateAvailableCategories(data.type);
      this.transactionForm.patchValue({
        type: data.type,
        category: data.category,
        amount: data.amount,
      })
    }, 
    error: (error) => {
      console.log('Error loading transaction', error);
    }
  })
  }
  onTypeChange(){
    const type = this.transactionForm.get('type')?.value;
   this.updateAvailableCategories(type);
  }
  updateAvailableCategories(type: string){
    
    this.availableCategories = type === 'Expense' ? this.expenseCategotries : this.incomeCategotries;
    this.transactionForm.patchValue({
      category:''
    });
  }
  onSubmit(){
    if(this.transactionForm.valid){
      const formValue = this.transactionForm.value;
      // Ensure createdAt is sent as ISO string
      const transaction = {
        ...formValue,
        createdAt: formValue.createdAt ? new Date(formValue.createdAt).toISOString() : new Date().toISOString(),
      };

      if(this.editMode && this.transactionId){
        this.transactionService.update(this.transactionId, transaction).subscribe({
          next: () => {
          this.router.navigate(['/transactions']);
          }, 
          error: (error) => {
            console.log('Error updating transaction', error);
          }
        })
      }
      else{
      console.log(transaction);
      this.transactionService.create(transaction).subscribe({
       next: () => {
          this.router.navigate(['/transactions']);
          }, 
          error: (error) => {
            console.log('Error Adding transaction', error);
          }
      });
    }
    }
  }
}