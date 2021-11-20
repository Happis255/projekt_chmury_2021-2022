import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/auth/auth.guard";
import { SimpleLayoutComponent } from "./core/layouts/simple-layout/simple-layout.component";
import { MainLayoutComponent } from "./core/layouts/main-layout/main-layout.component";
import { HomePageComponent } from "./core/home/container/home-page.component";

const routes: Routes = [
    {
        path: "login",
        component: SimpleLayoutComponent,
        children: [{
            path: "",
            loadChildren: "./feature/login/login.module#LoginModule"
        }],
    },
    {
        path: "",
        component: MainLayoutComponent,
        children: [
            { path: "dashboard", component: HomePageComponent },
            {
                path: "account",
                loadChildren: () => import("src/app/feature/account/account.module").then(m => m.AccountModule)

            },
            {
                path: "clients",
                loadChildren: () => import("src/app/feature/clients/clients.module").then(m => m.ClientsModule)

            },
            {
                path: "employess",
                loadChildren: () => import("src/app/feature/employess/employess.module").then(m => m.EmployessModule)

            },
            {
                path: "equipment",
                loadChildren: () => import("src/app/feature/equipment/equipment.module").then(m => m.EquipmentModule)

            },
            {
                path: "events",
                loadChildren: () => import("src/app/feature/events/events.module").then(m => m.EventsModule)

            },
            {
                path: "permissions",
                loadChildren: () => import("src/app/feature/permissions/permissions.module").then(m => m.PermissionsModule)

            },
            {
                path: "products",
                loadChildren: () => import("src/app/feature/products/products.module").then(m => m.ProductsModule)

            },
            {
                path: "raports",
                loadChildren: () => import("src/app/feature/raports/raports.module").then(m => m.RaportsModule)

            },
            {
                path: "services",
                loadChildren: () => import("src/app/feature/services/services.module").then(m => m.ServicesModule)

            },
            {
                path: "system-management",
                loadChildren: () => import("src/app/feature/system-management/system-management.module").then(m => m.SystemManagementModule)

            },
            {
                path: "visits",
                loadChildren: () => import("src/app/feature/visits/visits.module").then(m => m.VisitsModule)

            }
        ],
        canActivateChild: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: "",
        pathMatch: "full",
        canActivate: [AuthGuard],
        redirectTo: "/dashboard"
    },
    {
        path: "**",
        redirectTo: "404"
    },
    {
        path: "",
        component: SimpleLayoutComponent,
        children: [{
            path: "404",
            loadChildren: () => import("src/app/feature/not-found/not-found.module").then(m => m.NotFoundModule)
        }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
