import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  Renderer2,
  Host
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

  @Input()
  twoColor: string;

  @ViewChild("actualSlot")
  actualSlotEl: ElementRef;

  @ViewChild("dieEl")
  dieEl: ElementRef;

  @Input()
  index: number; // index of this target in the parent

  die: Die;

  constructor(
    private renderer: Renderer2,
    @Host() private parent: CardComponent // Instead of this, maybe can put the canPlaceDie logic up in Card? worth exploring all the different architecture possibilities. also even if we keep this idea (child getting info from parent), there are a couple different ways of doing that that might be worth exploring
  ) {}

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
  // todo should caller or placeDie be responsible for checking legality?
  public placeDie(die: Die): boolean {
    if (!this.canPlaceDie(die)) {
      console.log("Illegal placement (caught in placeDie)");
      return false;
    }

    this.die = die;
    this.renderer.addClass(this.dieEl.nativeElement, this.die.color);
  }

  canPlaceDie(die: Die): boolean {
    return this.getRelevantConstraints().every(f =>
      f(this.parent.targets, die, this.index)
    );
  }

  private getRelevantConstraints(): ActualConstraint[] {
    return zip(this.parent._constraints, this.parent.constraints)
      .filter(([constraint, _]) => {
        return constraint.targets && constraint.targets.includes(this.index);
      })
      .map(([_, actualConstraint]) => actualConstraint);
  }

  public handleClick() {
    const s = prompt("Place a die, e.g. red 2");
    const [color, numberString] = s.split(" ");
    const number = +numberString;
    // todo no error handling (e.g. malformed strings, bad colors, nums outside of 1-6)
    const die = { color: color as any, number: number as any };
    if (this.canPlaceDie(die)) {
      this.placeDie(die);
    } else {
      console.log("Illegal placement (caught in handleClick)");
    }
  }
}
