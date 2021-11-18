import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EquipmentComponent } from "./container/equipment/equipment.component";

const routes: Routes = [
    { path: "", component: EquipmentComponent },
    { path: "add-new", component: EquipmentComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EquipmentRouting { }
