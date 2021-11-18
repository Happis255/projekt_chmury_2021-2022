import { EditProductSellComponent } from './../../component/edit-product-sell/edit-product-sell.component';
import { AddProductSellComponent } from './../../component/add-product-sell/add-product-sell.component';
import { EditProductUseComponent } from './../../component/edit-product-use/edit-product-use.component';
import { AddProductUseComponent } from './../../component/add-product-use/add-product-use.component';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductsFacade } from "./../../products.facade";
import { OnDestroy, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IProductForSell } from "src/app/core/home/model/product-for-sell.interface";
import { IProductForUse } from "src/app/core/home/model/product-for-use.interface";
import { MessageBoxComponent } from "src/app/shared/message-box/component/message-box/message-box.component";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.sass"]
})
export class ProductsComponent implements OnInit, OnDestroy {

    @ViewChild("MatSortProductsForUse")
    public matSortProductsForUse: MatSort;

    @ViewChild("MatPagProductsForUse")
    public matPagProductsForUse: MatPaginator;

    @ViewChild("MatSortProductsForSell")
    public matSortProductsForSell: MatSort;

    @ViewChild("MatPagProductsForSell")
    public matPagProductsForSell: MatPaginator;

    public tableUseDisplayedColumns: string[] = ["name", "description", "price", "amount", "code", "actions"];
    public tableSellDisplayedColumns: string[] = ["name", "description", "price", "amount", "actions"];
    public tableUseSource: MatTableDataSource<IProductForUse>;
    public tableSellSource: MatTableDataSource<IProductForSell>;
    public productForUse: IProductForUse[];
    public productForSell: IProductForSell[];
    public subscriptionTable: Subscription[] = [];
    public userRole = localStorage.getItem(environment.APP_PREFIX + "role");

    constructor(
        private _productsFacade: ProductsFacade,
        private _dialog: MatDialog,
        private _translate: TranslateService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._productsFacade.loadAllProductsForUse();
        this._productsFacade.loadAllProductsForSell();
        this.subscriptionTable.push(
            this._productsFacade.getProductForUse$().subscribe(
                (products: IProductForUse[]) => {
                    this.productForUse = products;
                    this.tableUseSource = new MatTableDataSource(this.productForUse);
                    this.tableUseSource.sort = this.matSortProductsForUse;
                    if (this.productForUse?.length > 0) {
                        this.tableUseSource.paginator = this.matPagProductsForUse;
                    }
                }
            )
        );
        this.subscriptionTable.push(
            this._productsFacade.getProductForSell$().subscribe(
                (products: IProductForSell[]) => {
                    this.productForSell = products;
                    this.tableSellSource = new MatTableDataSource(this.productForSell);
                    this.tableSellSource.sort = this.matSortProductsForSell;
                    if (this.productForSell?.length > 0) {
                        this.tableSellSource.paginator = this.matPagProductsForSell;
                    }
                }
            )
        );
        this._checkUrlIfToOpenModal();
    }

    ngOnDestroy(): void {
        this.subscriptionTable.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    private _checkUrlIfToOpenModal(): void {
        if (this._router.url.includes("add-new")) {
            this.addNewUse();
        }
    }

    public deleteProductUse(productUse: IProductForUse): void {
        const message = this._translate.instant("shared.delete-product");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._productsFacade.deleteProductUse(productUse.uuid).then(() => {
                    this._productsFacade.loadAllProductsForUse();
                });
            }
        });
    }

    public removeOneProductUse(productUse: IProductForUse): void {
        this._productsFacade.removeOneProductUse(productUse.uuid).then(() => {
            this._productsFacade.loadAllProductsForUse();
        });
    }

    public addOneProductUse(productUse: IProductForUse): void {
        this._productsFacade.addOneProductUse(productUse.uuid).then(() => {
            this._productsFacade.loadAllProductsForUse();
        });
    }

    public deleteProductSell(productSell: IProductForSell): void {
        const message = this._translate.instant("shared.delete-product");
        this._dialog.open(MessageBoxComponent, {
            data: {
                message,
                confirmButton: true,
                cancelButton: true
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this._productsFacade.deleteProductSell(productSell.uuid).then(() => {
                    this._productsFacade.loadAllProductsForSell();
                });
            }
        });
    }

    public removeOneProductSell(productSell: IProductForSell): void {
        this._productsFacade.removeOneProductSell(productSell.uuid).then(() => {
            this._productsFacade.loadAllProductsForSell();
        });
    }

    public addOneProductSell(productSell: IProductForSell): void {
        this._productsFacade.addOneProductSell(productSell.uuid).then(() => {
            this._productsFacade.loadAllProductsForSell();
        });
    }

    public editProductSell(productSell: IProductForSell): void {
        const dialogRef = this._dialog.open(EditProductSellComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.productToEdit = productSell;
        dialogRef.afterClosed().subscribe((editedProduct: IProductForSell) => {
            if (editedProduct) {
                this._productsFacade.editProductSell(editedProduct).then(() => {
                    this._productsFacade.loadAllProductsForSell();
                });
            }
        });
    }

    public addNewSale(): void {
        const dialogRef = this._dialog.open(AddProductSellComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newProduct: IProductForSell) => {
            if (newProduct) {
                this._productsFacade.addnewProduct(newProduct).then(() => {
                    this._productsFacade.loadAllProductsForSell();
                });
            }
        });
    }

    public editProductUse(productUse: IProductForUse): void {
        const dialogRef = this._dialog.open(EditProductUseComponent, {
            disableClose: true
        });
        dialogRef.componentInstance.productToEdit = productUse;
        dialogRef.afterClosed().subscribe((editedProduct: IProductForUse) => {
            if (editedProduct) {
                this._productsFacade.editProductUse(editedProduct).then(() => {
                    this._productsFacade.loadAllProductsForUse();
                });
            }
        });
    }

    public addNewUse(): void {
        const dialogRef = this._dialog.open(AddProductUseComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((newProduct: IProductForUse) => {
            if (newProduct) {
                this._productsFacade.addProductUse(newProduct).then(() => {
                    this._productsFacade.loadAllProductsForUse();
                });
            }
        });
    }
}
