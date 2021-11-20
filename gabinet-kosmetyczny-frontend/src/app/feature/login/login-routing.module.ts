import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginDialogComponent } from "./container/login-dialog/login-dialog.component";

const routes: Routes = [
    { path: "", component: LoginDialogComponent },
    { path: "**", redirectTo: "" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
