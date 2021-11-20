import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VisitsComponent } from "./container/visits/visits.component";

const routes: Routes = [
    { path: "", component: VisitsComponent },
    { path: "add-new", component: VisitsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitsRouting { }
