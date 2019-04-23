import { Injectable } from "@angular/core";
import { Constraint } from "./constraints-parser.service";
import { SlotComponent } from "./slot/slot.component";
import { Die } from "./app.component";

@Injectable({
  providedIn: "root"
})
export class ConstraintService {
  constructor() {}

  createBinaryConstraint(constraint: Constraint) {
    let f: Function;
    if (constraint.name === "eq-color") {
      // f =
    } else {
      throw new Error("not implemented");
    }

    return function(
      slots: SlotComponent[], // is this all the slots in the card or just the slots necessary for f?
      proposedDie: Die,
      proposedSlotIndex: number
    ) {
      // todo slots themselves should reject placement if already have die. can manually test this by adding Slot.handleClick to dice too (not just actualSlots)
      const values = slots.map(x => x.die);
      values[proposedSlotIndex] = proposedDie;
      if (!values.every(x => !!x)) {
        // Constraints only take effect once every other slot is full
        return true;
      }

      // return f(...)
    };
  }
}
