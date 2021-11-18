import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { ProductsFacade } from "./products.facade";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./container/products/products.component";
import { ProductsSaleComponent } from "./container/products-sale/products-sale.component";
import { TranslateModule } from "@ngx-translate/core";
import { ProductsRouting } from "./products-routing.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MessageBoxModule } from "src/app/shared/message-box/message-box.module";
import { ProductsApi } from "./api/products.api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RaportsRouting } from "../raports/raports-routing.module";
import { ServicesModule } from "../services/services.module";
import { ProductsState } from "./state/products.state";
import { EditProductSellComponent } from "./component/edit-product-sell/edit-product-sell.component";
import { EditProductUseComponent } from "./component/edit-product-use/edit-product-use.component";
import { AddProductUseComponent } from "./component/add-product-use/add-product-use.component";
import { AddProductSellComponent } from "./component/add-product-sell/add-product-sell.component";
import { AddProductPromotionModalComponent } from './component/add-product-promotion-modal/add-product-promotion-modal.component';
import { EditProductPromotionModalComponent } from './component/edit-product-promotion-modal/edit-product-promotion-modal.component';
import { ViewProductPromotionModalComponent } from './component/view-product-promotion-modal/view-product-promotion-modal.component';
import { ProductsSaleWorkerComponent } from './container/products-sale-worker/products-sale-worker.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductsSaleComponent,
        EditProductSellComponent,
        EditProductUseComponent,
        AddProductUseComponent,
        AddProductSellComponent,
        AddProductPromotionModalComponent,
        EditProductPromotionModalComponent,
        ViewProductPromotionModalComponent,
        ProductsSaleWorkerComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ProductsRouting,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatButtonModule,
        MatBadgeModule,
        MessageBoxModule,
        MatDialogModule,
        RaportsRouting,
        ServicesModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCardModule,
        MatDividerModule
    ],
    providers: [
        ProductsApi,
        ProductsState,
        ProductsFacade
    ]
})
export class ProductsModule { }
