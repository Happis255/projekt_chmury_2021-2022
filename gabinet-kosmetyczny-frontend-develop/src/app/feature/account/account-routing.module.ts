import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "./container/account/account.component";

const routes: Routes = [
    { path: "", component: AccountComponent },
    { path: "worker", component: AccountComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
