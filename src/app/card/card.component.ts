import {
  Component,
  OnInit,
  ViewChildren,
  Input,
  ComponentFactoryResolver,
  ViewChild
} from "@angular/core";
import { BombCardJSON, BombParserService } from "../bomb-parser.service";
import { Item } from "../items-parser.service";
import { SlotComponent } from "../slot/slot.component";
import { ItemInsertionPointDirective } from "../item-insertion-point.directive";
import { EqComponent } from "../eq/eq.component";
import { ConstraintService, ActualConstraint } from "../constraint.service";
import { Constraint } from "../constraints-parser.service";
import { Die } from "../app.component";
import { zip } from "lodash";

// todo rename to BombCardComponent?
@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() card: BombCardJSON;

  @ViewChild(ItemInsertionPointDirective) anchor: ItemInsertionPointDirective;

  // underscore properties are ast nodes
  private _items;
  // target.rainbow
  // target
  private _constraints: Constraint[];
  // eq-color

  // not-underscore properties are actual things
  private items;
  private constraints: ActualConstraint[];
  private targets;

  private index = 0;

  constructor(
    private bombParser: BombParserService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private constraintService: ConstraintService
  ) {}

  ngOnInit() {
    const foos = (window["cards"] = window["cards"] || []); // ptodo-debug
    const el = this["pdebugEl"] && this["pdebugEl"]["nativeElement"];
    el && el.setAttribute("pdebugIndex", "card." + foos.length);
    foos.push(this);
    window["card"] = this;

    const { items, constraints } = this.bombParser.parse(this.card);
    this._items = items;
    this._constraints = constraints;

    this.items = this._items.map(x => this.addItem(x));
    this.targets = this.items.filter(x => x instanceof SlotComponent);
    this.constraints = this._constraints.map(x =>
      // todo other arities
      this.constraintService.createBinaryConstraint(x)
    );
  }

  // Create the component AND return it
  private addItem(_item: Item) {
    const slotComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      SlotComponent
    );
    const eqComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      EqComponent
    );
    const viewContainerRef = this.anchor.viewContainerRef;

    if (_item.name === "target") {
      const componentRef = viewContainerRef.createComponent(
        slotComponentFactory
      );
      const item = componentRef.instance;
      if (_item.attributes && _item.attributes.includes("rainbow")) {
        item.fiveColor = true;
      }
      const slotIndex = this.index;
      item.tryPlaceDie.subscribe((die: Die) => {
        // get constraints
        const relevantConstraints: ActualConstraint[] = zip(
          this._constraints,
          this.constraints
        )
          .filter(([constraint, _]) => {
            return constraint.targets && constraint.targets.includes(slotIndex);
          })
          .map(([_, actualConstraint]) => actualConstraint);

        const canPlaceDie = relevantConstraints.every(f =>
          f(this.targets, die, slotIndex)
        );

        if (canPlaceDie) {
          item.placeDie(die);
        } else {
          console.log("can't place die");
        }
      });
      this.index++;
      return item;
    } else if (_item.name === "eq") {
      const componentRef = viewContainerRef.createComponent(eqComponentFactory);
      const item = componentRef.instance;
      return item;
    } else {
      throw new Error("not implemented");
    }
  }
}
