import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RaportsComponent } from "./container/raports/raports.component";

const routes: Routes = [
    { path: "", component: RaportsComponent },
    { path: "add-new", component: RaportsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RaportsRouting { }
