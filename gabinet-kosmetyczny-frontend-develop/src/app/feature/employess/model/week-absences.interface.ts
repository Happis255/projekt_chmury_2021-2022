import { IAbsence } from "./absence.interface";

export interface IWeekAbsences {
    mondayAbsences?: IAbsence[];
    tuesdayAbsences?: IAbsence[];
    wednesdayAbsences?: IAbsence[];
    thursdayAbsences?: IAbsence[];
    fridayAbsences?: IAbsence[];
}
