import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  Renderer2,
  Host,
  Output,
  EventEmitter
} from "@angular/core";
import { DieColor, Die } from "../app.component";
import { CardComponent } from "../card/card.component";
import { zip } from "lodash";
import { ActualConstraint } from "../constraint.service";

// todo slots vs targets

@Component({
  selector: "slot",
  templateUrl: "./slot.component.html",
  styleUrls: ["./slot.component.scss"]
})
export class SlotComponent implements OnInit {
  @Input()
  fiveColor: boolean;

  @Output()
  tryPlaceDie: EventEmitter<Die> = new EventEmitter();

  @Input()
  twoColor: string;

  @ViewChild("actualSlot")
  actualSlotEl: ElementRef;

  @ViewChild("dieEl")
  dieEl: ElementRef;

  die: Die;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const foos = (window["slots"] = window["slots"] || []); // ptodo-debug
    const el = this["pdebugEl"] && this["pdebugEl"]["nativeElement"];
    el && el.setAttribute("pdebugIndex", "slot." + foos.length);
    foos.push(this);
    window["slot"] = this;
    if (this.twoColor) {
      const [color1, color2] = this.twoColor.split(",").map(x => x.trim());
      const twoColorClass = `two-color-${color1}-${color2}`;
      this.renderer.addClass(this.actualSlotEl.nativeElement, twoColorClass);
    }
  }

  // todo (whether handled by me in placeDie or by caller in constraint) --
  // are we prevented for placing die on filled slot?

  public placeDie(die: Die): void {
    this.die = die;
    this.renderer.addClass(this.dieEl.nativeElement, this.die.color);
  }

  public handleClick() {
    const s = prompt("Place a die, e.g. red 2");
    const [color, numberString] = s.split(" ");
    const number = +numberString;
    // todo no error handling (e.g. malformed strings, bad colors, nums outside of 1-6)
    const die = { color: color as any, number: number as any };
    this.tryPlaceDie.emit(die);
  }
}
