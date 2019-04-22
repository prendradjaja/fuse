import { Component, OnInit, Input, HostBinding } from "@angular/core";

@Component({
  selector: "slot",
  templateUrl: "./slot.component.html",
  styleUrls: ["./slot.component.scss"]
})
export class SlotComponent implements OnInit {
  @HostBinding("class.five-color")
  @Input()
  fiveColor: boolean;

  constructor() {}

  ngOnInit() {}
}
