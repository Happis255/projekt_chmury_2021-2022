import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./container/clients/clients.component";

const routes: Routes = [
    { path: "", component: ClientsComponent },
    { path: "add-new", component: ClientsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientstRoutingModule { }
