import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { ErrorInterceptorService } from "./core/error/service/error-interceptor.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NativeDateModule } from "@angular/material/core";
import { MainLayoutComponent } from "./core/layouts/main-layout/main-layout.component";
import { SimpleLayoutComponent } from "./core/layouts/simple-layout/simple-layout.component";
import { UserUuidInterceptor } from "./core/http-client/http-client.service";

const translateModuleConfig = {
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
};

const InterceptorServiceProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
};

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        SimpleLayoutComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        TranslateModule.forRoot(translateModuleConfig),
        NativeDateModule
    ],
    providers: [
        InterceptorServiceProvider,
        { provide: HTTP_INTERCEPTORS, useClass: UserUuidInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {}
}

export function HttpLoaderFactory(http: HttpClient): any {
    return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
