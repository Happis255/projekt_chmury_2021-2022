import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IProductForSell } from "../../model/product-for-sell.interface";
import { IProductForUse } from "../../model/product-for-use.interface";

@Component({
    selector: "app-products-information",
    templateUrl: "./products-information.component.html",
    styleUrls: ["./products-information.component.sass"]
})
export class ProductsInformationComponent implements OnInit, AfterViewInit, OnChanges {

    @Input()
    public productForUse: IProductForUse[];

    @Input()
    public productForSell: IProductForSell[];

    @ViewChild("MatSortProductsForUse")
    public matSortProductsForUse: MatSort;

    @ViewChild("MatPagProductsForUse")
    public matPagProductsForUse: MatPaginator;

    @ViewChild("MatSortProductsForSell")
    public matSortProductsForSell: MatSort;

    @ViewChild("MatPagProductsForSell")
    public matPagProductsForSell: MatPaginator;

    public tableUseDisplayedColumns: string[] = ["name", "description", "price", "amount", "code"];
    public tableSellDisplayedColumns: string[] = ["name", "description", "price", "amount"];
    public tableUseSource: MatTableDataSource<IProductForUse>;
    public tableSellSource: MatTableDataSource<IProductForSell>;

    constructor() { }

    ngOnInit(): void {
        this.tableUseSource = new MatTableDataSource(this.productForUse);
        this.tableSellSource = new MatTableDataSource(this.productForSell);
    }

    ngAfterViewInit(): void {
        this._reload();
    }

    ngOnChanges(): void {
        this.tableUseSource = new MatTableDataSource(this.productForUse);
        this.tableSellSource = new MatTableDataSource(this.productForSell);
        this._reload();
    }

    private _reload(): void {
        this.tableUseSource.sort = this.matSortProductsForUse;
        this.tableSellSource.sort = this.matSortProductsForSell;

        if (this.productForUse?.length > 0) {
            this.tableUseSource.paginator = this.matPagProductsForUse;
        }
        if (this.productForSell?.length > 0) {
            this.tableSellSource.paginator = this.matPagProductsForSell;
        }
    }
}
