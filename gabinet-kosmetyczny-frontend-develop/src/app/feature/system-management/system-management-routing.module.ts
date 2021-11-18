import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SystemManagementComponent } from "./container/system-management/system-management.component";

const routes: Routes = [
    { path: "", component: SystemManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemManagementRouting { }
