import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsSaleWorkerComponent } from './container/products-sale-worker/products-sale-worker.component';
import { ProductsSaleComponent } from "./container/products-sale/products-sale.component";
import { ProductsComponent } from "./container/products/products.component";

const routes: Routes = [
    { path: "", component: ProductsComponent },
    { path: "add-new", component: ProductsComponent },
    { path: "sales", component: ProductsSaleComponent },
    { path: "sales/worker", component: ProductsSaleWorkerComponent },
    { path: "sales/add-new", component: ProductsSaleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRouting { }
