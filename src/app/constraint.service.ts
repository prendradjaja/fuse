import { Injectable } from "@angular/core";
import { Constraint } from "./constraints-parser.service";
import { SlotComponent } from "./slot/slot.component";
import { Die } from "./app.component";

// todo update all the examples to be zero-indexed

export type ActualConstraint = (
  slots: SlotComponent[],
  proposedDie: Die,
  proposedSlotIndex: number
) => any;

@Injectable({
  providedIn: "root"
})
export class ConstraintService {
  constructor() {}

  createBinaryConstraint(constraint: Constraint) {
    let f: Function;
    if (constraint.name === "eq-color") {
      f = (a: Die, b: Die) => {
        return a.color === b.color;
      };
    } else {
      throw new Error("not implemented");
    }

    return (
      slots: SlotComponent[],
      proposedDie: Die,
      proposedSlotIndex: number
    ) => {
      // todo slots themselves should reject placement if already have die. can manually test this by adding Slot.handleClick to dice too (not just actualSlots)
      const allDice = slots.map(x => x.die);
      allDice[proposedSlotIndex] = proposedDie;

      const allRelevantDice = allDice.filter((_, i) =>
        constraint.targets.includes(i)
      );

      // check a dice is in every slot
      if (!allRelevantDice.every(x => !!x)) {
        // Constraints only take effect once every other slot is full
        return true;
      }

      const [slotAIndex, slotBIndex] = constraint.targets;
      const dieA = allDice[slotAIndex];
      const dieB = allDice[slotBIndex];

      return f(dieA, dieB);
    };
  }
}
