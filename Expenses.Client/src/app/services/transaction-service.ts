import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/itransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5298/';
  constructor(private http: HttpClient) { }

    getAll(): Observable<ITransaction[]>{
      return this.http.get<ITransaction[]>(this.apiUrl + 'api/Transactions/All');
    }

    getById(id: number): Observable<ITransaction> {
      return this.http.get<ITransaction>(`${this.apiUrl}api/Transactions/Details/${id}`);
    }

    create(transaction: ITransaction): Observable<ITransaction> {
      return this.http.post<ITransaction>(this.apiUrl + 'api/Transactions/Create', transaction);
    }

    update(id: number, transaction: ITransaction): Observable<ITransaction> {
      return this.http.put<ITransaction>(`${this.apiUrl}api/Transactions/Update/${id}`, transaction);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}api/Transactions/Delete/${id}`);
    }
}
