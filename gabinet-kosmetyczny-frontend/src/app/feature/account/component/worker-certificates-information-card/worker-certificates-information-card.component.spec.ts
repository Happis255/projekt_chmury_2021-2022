import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WorkerCertificatesInformationCardComponent } from "./worker-certificates-information-card.component";

describe("WorkerCertificatesInformationCardComponent", () => {
    let component: WorkerCertificatesInformationCardComponent;
    let fixture: ComponentFixture<WorkerCertificatesInformationCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerCertificatesInformationCardComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerCertificatesInformationCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
