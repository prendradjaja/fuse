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
  private _constraints;
  // eq-color

  // not-underscore properties are actual things
  private items;
  private constraints;
  private targets;

  constructor(
    private bombParser: BombParserService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const { items, constraints } = this.bombParser.parse(this.card);
    this._items = items;
    this._constraints = constraints;

    this._items.forEach(x => this.addItem(x));
  }

  private addItem(_item: Item) {
    const slotComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      SlotComponent
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
      return item;
    } else {
      throw new Error("not implemented");
    }
  }
}
