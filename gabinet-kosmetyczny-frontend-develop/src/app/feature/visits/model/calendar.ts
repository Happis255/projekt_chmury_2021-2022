import { ICalendarElement } from "./calendar-elemen.model";

export interface ICalendarWorking {
    mondayWorkingDay?: ICalendarElement[];
    tuesdayWorkingDay?: ICalendarElement[];
    wednesdayWorkingDay?: ICalendarElement[];
    thursdayWorkingDay?: ICalendarElement[];
    fridayWorkingDay?: ICalendarElement[];
}
