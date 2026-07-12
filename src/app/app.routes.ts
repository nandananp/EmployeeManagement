import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { PageNotFound } from './page-not-found/page-not-found';
import { Products } from './products/products';
import { ProductList } from './products-list/products-list';
import { ProductDetail } from './product-detail/product-detail';
import { ProductEdit } from './product-edit/product-edit';
import { Login } from './login/login';
import { authGuard } from './auth-guard';
import { deactivateGuard } from './deactivate-guard';
import { AddProduct } from './add-product/product/add-product';
import { EmployeeComponent } from './EMPLOYEE/employee/employee';

export const routes: Routes = [
    // {path:'',component:Home},
    // {path:'home', component:Home},
    // {path:'about', component:About},
    // {path:'login',component:Login},
    
    
    // {path:'products',component:Products,canActivate:[authGuard],
    //     children:[
    //         {path:'',component:ProductList},
    //         {path:'list', component:ProductList},
    //         {path:'add', component:AddProduct},
    //         {path:':id', component:ProductDetail},
    //         {path:':id/edit', component:ProductEdit,canDeactivate:[deactivateGuard]}
    //     ]
    // },
    // {path:'**', component:PageNotFound},


     { path: 'employee', component: EmployeeComponent }, // <-- Add this

//   { path: '**', component: PageNotFound },
];
