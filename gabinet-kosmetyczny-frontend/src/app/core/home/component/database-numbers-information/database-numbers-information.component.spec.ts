import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DatabaseNumbersInformationComponent } from "./database-numbers-information.component";

describe("DatabaseNumbersInformationComponent", () => {
    let component: DatabaseNumbersInformationComponent;
    let fixture: ComponentFixture<DatabaseNumbersInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseNumbersInformationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DatabaseNumbersInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
