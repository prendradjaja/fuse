import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { DieColor, Die } from "../app.component";

// todo slots vs targets

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

  /**
   * @returns true if successful
   */
  public placeDie(die: Die): boolean {
    if (!this.canPlaceDie(die)) {
      return false;
    }

    this.die = die;
    this.renderer.addClass(this.dieEl.nativeElement, this.die.color);
  }

  canPlaceDie(die: Die): boolean {
    return true;
  }

  public handleClick() {
    const s = prompt("Place a die, e.g. red 2");
    const [color, numberString] = s.split(" ");
    const number = +numberString;
    // todo no error handling (e.g. malformed strings, bad colors, nums outside of 1-6)
    const die = { color: color as any, number: number as any };
    if (this.canPlaceDie(die)) {
      this.placeDie(die);
    }
  }
}
