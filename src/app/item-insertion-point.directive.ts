import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[itemInsertionPoint]"
})
export class ItemInsertionPointDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
