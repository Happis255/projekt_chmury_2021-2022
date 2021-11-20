export interface IEquipment {
    uuid?: string;
    name?: string;
    description?: string;
    getDate?: Date;
    warrantyDate?: Date;
    lastCheckDate?: Date;
    comments?: string;
    toCheck?: boolean;
}
