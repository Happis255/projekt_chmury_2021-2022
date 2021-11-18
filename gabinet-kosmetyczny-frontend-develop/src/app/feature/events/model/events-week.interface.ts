import { IEvent } from "./event.model";

export interface IEventsWeek {
    mondayEvents?: IEvent[];
    tuesdayEvents?: IEvent[];
    wednesdayEvents?: IEvent[];
    thursdayEvents?: IEvent[];
    fridayEvents?: IEvent[];
}
