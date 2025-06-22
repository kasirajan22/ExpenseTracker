import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },{
        path:'signup',
        component: Signup
    },
    {
        path:'transactions',
        component:TransactionList,
        canActivate: [authGuard] // Assuming you have an authGuard to protect this route
    },
    {
        path:'add',
        component:TransactionForm,
        canActivate: [authGuard] // Assuming you have an authGuard to protect this route
    },
    {
        path:"edit/:id",
        component:TransactionForm,
        canActivate: [authGuard] // Assuming you have an authGuard to protect this route
    },
    // {
    //     path:'',
    //     redirectTo:'/transactions',
    //     pathMatch:'full',
    //     canActivate: [authGuard] // Assuming you have an authGuard to protect this route
    // },
    {
        path:'**',
        redirectTo:'/transactions',
    }
];
