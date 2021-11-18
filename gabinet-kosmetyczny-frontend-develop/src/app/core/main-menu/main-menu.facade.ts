import { Injectable } from "@angular/core";
import { AuthFacade } from "src/app/core/auth/auth.facade";
import { IUser } from "../auth/model/user.interface";
import { ISideMenuElement } from "./model/side-menu-element";

@Injectable()
export class MainMenuFacade {

    constructor(
        private _auth: AuthFacade
    ) { }

    public getLocalUserData(): IUser {
        return this._auth.getLocalStorageData();
    }

    public signOut(): void {
        this._auth.onClearSession();
    }

    public generateMenuItemsAdmin(): ISideMenuElement[] {
        return [
            {
                title: "menu.home-page",
                icon: "home",
                isChild: false,
                childrens: [],
                url: "/dashboard",
                accessRole: "ADMIN"
            },
            {
                title: "menu.account",
                icon: "account_circle",
                isChild: false,
                childrens: [],
                url: "/account",
                accessRole: "ADMIN"
            },
            {
                title: "menu.employees",
                icon: "accessibility_new",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.employees-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess",
                    modalUrl: "/employess/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.employees-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.employees-economic-task",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess/task",
                    modalUrl: "/employess/task/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.employees-economic-task-add",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    isModal: true,
                    url: "/employess/task/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.employees-absences",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess/absences",
                    modalUrl: "/employess/absences/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.employees-absences-add",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    isModal: true,
                    accessRole: "ADMIN",
                    url: "/employess/absences/add-new",
                }]
            },
            {
                title: "menu.services",
                icon: "pan_tool",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.services-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/services",
                    modalUrl: "/services/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.services-add",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/services/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.services-sales",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/services/sales",
                    modalUrl: "/services/sales/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.services-sales-add",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/services/sales/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            },
            {
                title: "menu.permissions",
                icon: "admin_panel_settings",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [],
                url: "/permissions",
            },
            {
                title: "menu.clients",
                icon: "contacts",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.clients-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/clients",
                    modalUrl: "/clients/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.clients-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "clients/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            },
            {
                title: "menu.visits",
                icon: "date_range",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.visits-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/visits",
                    modalUrl: "/visits/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.visits-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/visits/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            },
            {
                title: "menu.raports",
                icon: "description",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.raports-manager",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/raports",
                    modalUrl: "/raports/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.new-raport",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/raports/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            },
            {
                title: "menu.products",
                icon: "sanitizer",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.products-usage-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products",
                    modalUrl: "/products/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.products-usage-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.products-sale-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products/sales",
                    modalUrl: "/products/sales/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.products-sale-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products/sales/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            },
            {
                title: "menu.equipment",
                icon: "devices",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.equipment-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/equipment",
                    modalUrl: "/equipment/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.equipment-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/equipment/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            },
            {
                title: "menu.events",
                icon: "perm_contact_calendar",
                isChild: false,
                accessRole: "ADMIN",
                childrens: [{
                    title: "menu.events-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/events",
                    modalUrl: "/events/add-new",
                    accessRole: "ADMIN"
                },
                {
                    title: "menu.events-add-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/events/add-new",
                    isModal: true,
                    accessRole: "ADMIN"
                }]
            }
        ];
    }

    public generateMenuItemsWorker(): ISideMenuElement[] {
        return [
            {
                title: "menu.home-page",
                icon: "home",
                isChild: false,
                childrens: [],
                url: "/dashboard",
                accessRole: "WORKER"
            },
            {
                title: "menu.account",
                icon: "account_circle",
                isChild: false,
                childrens: [],
                url: "/account/worker",
                accessRole: "WORKER"
            },
            {
                title: "menu.employees",
                icon: "accessibility_new",
                isChild: false,
                accessRole: "WORKER",
                childrens: [{
                    title: "menu.employees",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess/worker",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.employees-economic-task",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess/task",
                    modalUrl: "/employess/task/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.employees-economic-task-add",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    isModal: true,
                    url: "/employess/task/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.employees-absences",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/employess/absences/worker",
                    modalUrl: "/employess/absences/worker/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.employees-absences-add",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    isModal: true,
                    accessRole: "WORKER",
                    url: "/employess/absences/worker/add-new",
                }]
            },
            {
                title: "menu.services",
                icon: "pan_tool",
                isChild: false,
                accessRole: "WORKER",
                childrens: [{
                    title: "menu.services-view",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/services/worker",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.services-sales",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/services/sales/worker",
                    accessRole: "WORKER"
                }]
            },
            {
                title: "menu.permissions",
                icon: "admin_panel_settings",
                isChild: false,
                accessRole: "WORKER",
                childrens: [],
                url: "/permissions/worker",
            },
            {
                title: "menu.clients",
                icon: "contacts",
                isChild: false,
                accessRole: "WORKER",
                childrens: [{
                    title: "menu.clients-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/clients",
                    modalUrl: "/clients/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.clients-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/clients/add-new",
                    isModal: true,
                    accessRole: "WORKER"
                }]
            },
            {
                title: "menu.visits",
                icon: "date_range",
                isChild: false,
                accessRole: "WORKER",
                childrens: [{
                    title: "menu.visits-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/visits",
                    modalUrl: "/visits/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.visits-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/visits/add-new",
                    isModal: true,
                    accessRole: "WORKER"
                }]
            },
            {
                title: "menu.raports",
                icon: "description",
                isChild: false,
                accessRole: "WORKER",
                childrens: [{
                    title: "menu.raports-manager",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/raports",
                    modalUrl: "/raports/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.new-raport",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/raports/add-new",
                    isModal: true,
                    accessRole: "WORKER"
                }]
            },
            {
                title: "menu.products",
                icon: "sanitizer",
                isChild: false,
                accessRole: "WORKER",
                childrens: [{
                    title: "menu.products-usage-management",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products",
                    modalUrl: "/products/add-new",
                    accessRole: "WORKER"
                },
                {
                    title: "menu.products-usage-new",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products/add-new",
                    isModal: true,
                    accessRole: "WORKER"
                },
                {
                    title: "menu.products-sale-view",
                    icon: "",
                    isChild: true,
                    childrens: [],
                    url: "/products/sales/worker",
                    accessRole: "WORKER"
                }]
            },
            {
                title: "menu.events",
                icon: "perm_contact_calendar",
                isChild: false,
                accessRole: "WORKER",
                url: "/events/worker",
                childrens: [],
            }
        ];
    }
}
