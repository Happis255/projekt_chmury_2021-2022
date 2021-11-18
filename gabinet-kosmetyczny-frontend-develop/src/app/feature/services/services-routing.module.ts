import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ServicesSalesWorkerComponent } from "./container/services-sales-worker/services-sales-worker.component";
import { ServicesSalesComponent } from "./container/services-sales/services-sales.component";
import { ServicesWorkerComponent } from "./container/services-worker/services-worker.component";
import { ServicesComponent } from "./container/services/services.component";

const routes: Routes = [
    { path: "", component: ServicesComponent },
    { path: "worker", component: ServicesWorkerComponent },
    { path: "add-new", component: ServicesComponent },
    { path: "sales", component: ServicesSalesComponent },
    { path: "sales/worker", component: ServicesSalesWorkerComponent },
    { path: "sales/add-new", component: ServicesSalesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesRouting { }
