import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployessAbsencesWorkerComponent } from "./container/employess-absences-worker/employess-absences-worker.component";
import { EmployessAbsencesComponent } from "./container/employess-absences/employess-absences.component";
import { EmployessTaskComponent } from "./container/employess-task/employess-task.component";
import { EmployessWorkerComponent } from "./container/employess-worker/employess-worker.component";
import { EmployessComponent } from "./container/employess/employess.component";

const routes: Routes = [
    { path: "", component: EmployessComponent },
    { path: "worker", component: EmployessWorkerComponent},
    { path: "add-new", component: EmployessComponent },
    { path: "absences", component: EmployessAbsencesComponent },
    { path: "absences/add-new", component: EmployessAbsencesComponent },
    { path: "absences/worker", component: EmployessAbsencesWorkerComponent },
    { path: "absences/worker/add-new", component: EmployessAbsencesWorkerComponent },
    { path: "task", component: EmployessTaskComponent },
    { path: "task/add-new", component: EmployessTaskComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployessRouting { }
