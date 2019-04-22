import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { DieColor } from "../app.component";

@Component({
  selector: "slot",
  templateUrl: "./slot.component.html",
  styleUrls: ["./slot.component.scss"]
})
export class SlotComponent implements OnInit {
  @Input()
  fiveColor: boolean;

  @Input()
  twoColor: string;

  @ViewChild("actualSlot")
  actualSlot: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    if (this.twoColor) {
      const [color1, color2] = this.twoColor.split(",").map(x => x.trim());
      const twoColorClass = `two-color-${color1}-${color2}`;
      this.renderer.addClass(this.actualSlot.nativeElement, twoColorClass);
    }
  }
}
