import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsWorkerComponent } from './container/events-worker/events-worker.component';
import { EventsComponent } from "./container/events/events.component";

const routes: Routes = [
    { path: "", component: EventsComponent },
    { path: "worker", component: EventsWorkerComponent },
    { path: "add-new", component: EventsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRouting { }
