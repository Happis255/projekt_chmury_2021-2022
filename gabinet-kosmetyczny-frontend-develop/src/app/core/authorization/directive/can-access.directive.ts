import { Directive, Input, AfterViewInit, ElementRef, Renderer2 } from "@angular/core";
import { AuthorizationService } from "../service/authorization.service";

@Directive({
    selector: "[appCanAccess]"
})
export class CanAccessDirective implements AfterViewInit {
    @Input() public appCanAccess: string;

    constructor(
        private _authorizationService: AuthorizationService,
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
         if (this._authorizationService.userHasAccess(this.appCanAccess)) {
             this.renderer.removeClass(this.el.nativeElement, "no-access");
         } else {
             this.renderer.addClass(this.el.nativeElement, "no-access");
         }
    }
}
