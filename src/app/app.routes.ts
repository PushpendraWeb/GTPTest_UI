import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SupplierDashboardComponent } from './components/supplier-dashboard/supplier-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SellerInformationComponent } from './components/seller-information/seller-information.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'dashboard', component: SupplierDashboardComponent, pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
    { path: 'product-details/:id', component: ProductDetailsComponent, pathMatch: 'full' },
    { path: 'seller-info/:id', component: SellerInformationComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    exports: [RouterModule]
})
export class AppRoutingModule { }