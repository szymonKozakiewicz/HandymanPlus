import { Routes } from '@angular/router';
import { Landing } from './features/landing/ui/pages/landing/landing';

export const routes: Routes = [
    {path:'', component:Landing},
    {
        path:'login',
        loadComponent:()=>import('./features/authentication/ui/pages/login/login')
        .then(c => c.Login)
    },
    {
        path:'register',
        loadComponent:()=>import('./features/authentication/ui/pages/register/register')
        .then(c => c.Register)
    },
    {
        path: 'operation-status',
        loadComponent:()=>import('./shared/pages/operation-status-page/operation-status-page')
        .then(c=>c.OperationStatusPage)
    }
];
