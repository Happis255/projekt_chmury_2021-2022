export interface ISideMenuElement {
    title: string;
    icon: string;
    isChild: boolean;
    isModal?: boolean;
    childrens: ISideMenuElement[];
    url?: string;
    modalUrl?: string;
    accessRole?: string;
}
