# Expense Tracker App

This repository contains a full-stack Expense Tracker application with a .NET 9 Web API backend and an Angular frontend.

## Project Structure

- `Expenses.API/` - .NET 9 Web API backend
- `Expenses.Client/` - Angular frontend

---

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- (Optional) SQL Server or SQLite for database

---

## Backend Setup (API)

1. Navigate to the API project:
   ```sh
   cd ExpenseAPI/Expenses.API
   ```
2. Restore dependencies:
   ```sh
   dotnet restore
   ```
3. Apply database migrations:
   ```sh
   dotnet ef database update
   ```
4. Run the API:
   ```sh
   dotnet run
   ```
   The API will start (default: `https://localhost:5001` or as configured).

---

## Frontend Setup (Angular)

1. Navigate to the Angular project:
   ```sh
   cd ExpenseAPP/Expenses.Client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the Angular app:
   ```sh
   ng serve
   ```
   The app will be available at `http://localhost:4200` by default.

---

## Useful Commands

- **.NET**
  - Build: `dotnet build`
  - Run: `dotnet run`
  - Migrate DB: `dotnet ef database update`
- **Angular**
  - Install: `npm install`
  - Run: `ng serve`
  - Build: `ng build`

---


