## 4/21

### The rules

Setup:
- Deal bomb cards
- Deal bomb cards to the Market
- Make the deck (pull N bomb cards & add M fuse cards)

On each turn:
- Draw & roll dice
- Pick stuff
  - Can undo picks
- End turn
- Cleanup
  - Put dice back in the bag
  - Discard completed bomb card
  - Pick from the Market
  - Replenish the Market
  - `while is fuse card: handle fuse card`

#### Does anything need to be changed to accomodate the digital format?

### Card representation

![](https://raw.githubusercontent.com/prendradjaja/fuse/master/JOURNAL.md.d/cards.jpg)

<sup align="center">Some examples of cards in Fuse.</sup>

Representing bomb cards is a little bit involved -- while for humans intuiting what each card means is pretty straightforward after learning the 4 or 5 different kinds of constraints, it's not so easy for a program!

I think the thing to do is represent card in terms of:

- Reusable UI elements
- Constraints

#### Reusable UI elements

- Slots and Targets
  - Colored slots (white, one-color, two-color, five-color) 
    - Five-color slots are not "any color", (that is what white is) but are to be used in conjunction with the `≠` symbol
  - `#` slots (to be used in conjunction with mathematical symbols)
  - Numbered slots (specifying a specific number that should go there)
  - Slots with both color and number/`#`
  - Stacks and pyramids
    - Small slots (purely visual / non-target) like in the diagram below
    - Arrows for stacks
- Mathematical symbols (`+` `>` `=` `≠`) that go between Slots

**Terminology: Slots vs Targets. Also, how stacks and pyramids work.** A Slot is a picture of a place where a die can go. A Target is a place where a die can go. These overlap, but not completely: Most Slots are Targets (& most Targets are Slots), but e.g. a stack card will look like:

```
 -------------------------------------------
|                                           |
|                                           |
|     --------                              |
|    |        |      ----   ----   ----     |
|    |        |     |    | |    | |    |    |
|    |        |     |   B| |   C| |   D|    |
|    |       A|      ----   ----   ----     |
|     --------                              |
|                   ====================>   |
|                                           |
 -------------------------------------------

- A is a Slot and a Target.
- B, C, and D are smaller slots that are purely visual (i.e. not Targets)
- Above A are two invisible(?) Targets where the rest of the stack goes.
```

#### Constraints

Whenever you place a die, the game will check constraints and reject the placement if needed.

Constraints can be unary (affecting one target), binary (relating two targets to one another), ternary, ...

- Unary:
  - Color: Must be a specific color(s)
  - Number: Must be a specific number(s)
- Binary:
  - Colors must be (un)equal
  - Numbers must be (un)equal
  - Numbers must obey a specific inequality
  - Numbers must add up to a specific sum
  - Stacks: Bottom must happen before top
- Ternary:
  - Three numbers must add up to a specific sum
  - Pyramids: Bottom two must happen before top

Implementation questions:
- Should e.g. triple-equality cards be represented as a ternary target (A = B = C) or two binary targets (A = B, B = C)?
- Should math things be implemented using a generic "math constraint" where you can specify an equation?
