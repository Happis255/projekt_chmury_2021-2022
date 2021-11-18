import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PermissionsWorkerComponent } from './container/permissions-worker/permissions-worker.component';
import { PermissionsComponent } from "./container/permissions/permissions.component";

const routes: Routes = [
    { path: "", component: PermissionsComponent },
    { path: "worker", component: PermissionsWorkerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissionsRouting { }