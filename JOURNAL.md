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

#### Changes or noteworthy things about the digital format

The two-stack bomb card (6 points) should have the stacks staggered.

Stack and pyramid cards will extend a bit above the edge of the card

### Card representation

<img src="https://raw.githubusercontent.com/prendradjaja/fuse/master/JOURNAL.md.d/cards.jpg">

<p align="center"><sup>Some examples of cards in Fuse.</sup></p>

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

**Terminology: Slots vs Targets. Also, how stacks and pyramids work.**
- A Slot is a component that shows a place where a die can go.
  - Most are also Targets: places where dice can actually go. Non-target slots are purely visual.
  - Some slots can be smaller or bigger. Some small slots are non-targets (in stacks and pyramids), and some are targets (in "greater than"/"less than" cards).
  - For stacks and pyramids, some slots are "ghost"-styled.

(Edit 4/22: Maybe this can be made clearer by just saying slot / target / ghost, perhaps instead of having this 2x2 taxonomy. there's no such thing as a ghost non-target slot soooo)

To make this clearer, here's a diagram:

```
      ........
     :        :
     :        :
     :        :
     :       F:
      ........
     :        :
 ----:--------:-----------------------------
|    :        :                             |
|    :       E:                             |
|     --------                              |
|    |        |      ----   ----   ----     |
|    |        |     |    | |    | |    |    |
|    |        |     |   B| |   C| |   D|    |
|    |       A|      ----   ----   ----     |
|     --------                              |
|                   -------------------->   |
|                                           |
 -------------------------------------------

ABCDEF are all Slots, but of different kinds:

- A, E, and F are targets.
- E and F are "ghost"-styled.
- B, C, and D are "small"-styled and non-targets.
```

Maybe it should actually be:

- Slots can be styled as "normal" or "ghost" (ghost slots are for stacks and pyramids)
- All targets are slots, but not all slots are targets

#### Constraints

Whenever you place a die, the game will check constraints and reject the placement if needed. For most constraints, this is probably fine, but for stack/pyramid constraints, the game probably should be a little more proactive (i.e. don't make it possible to even try to place dice in the wrong order in a stack)

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

----

How to define Sass variables that can be reused across components:

> What we do, is that we define a base.sass, that does not generates any CSS but only defines global variables.
>
> This stylesheet is then imported on top of the component sass stylesheets.
>
> `@import "./src/assets/private/sass/base";`
>
> It does not generate any CSS overhead in the components, you can leave ViewEncapsulation enabled and all is good.
>
> <p align="right"><sup>-- https://github.com/angular/angular-cli/issues/1253#issuecomment-305972033</sup></p>

----

I need to learn some design software! Currently I'm literally using:

[Google Slides](https://docs.google.com/presentation/d/1VDWIR3EjFYsjp0rZnK7N97ekHDtbN-yboASbJzaILhs/edit#slide=id.p)
- five-color.png

[maketext.io](https://maketext.io) ([config](./JOURNAL.md.d/make-text.io.config))
- equal.svg
- not-equal.svg

Learned: How to include images (and background images) in an Angular project!
- `<img src="assets/foo.png">`
- `background: url(src/assets/foo.png)`

N.B. One uses src and the other does not! No idea why. Also not sure about relative/absolute URLs etc here, but this works at least.

----

I love emojis as favicons! https://favicon.io/emoji-favicons/

Gradient generator: http://www.colorzilla.com/gradient-editor/

----

Not sure what the right way to style stuff inside `ng-content` is, but here are some options:
https://stackoverflow.com/questions/41090302/how-to-style-ng-content/41090797

----

Interesting generalizable UI question: If you have a collection of items of different colors/contents, how do you show "selection" or other state on these items?
- This came up in Bookworm as "how do I show which date I'm filtering by?"
- This exists in Google Photos -- their solution is to shrink the selected items
- In Fuse, I need a way to make slots that have no dice stand out visually from slots that do have dice

----

I think I have a reasonably good way to declaratively describe most bomb cards. There are a few this sort of thing doesn't cover, though.

Next thing to learn: How do I dynamically add components in Angular? I found some stuff online. Here's the only currently-working fiddle I could find: https://stackblitz.com/edit/add-or-remove-dynamic-component

~~...wait, do I need to dynamically add components? Not sure. Good old `*ngFor` might be sufficient..?~~

Definitely need to dynamically add components for card contents (since you don't know what component you're generating. I guess you could technically use a bunch of ngIfs in a template but screw that)

## 4/22

Wrote parsers and unit tests.

Looked at the rest of the cards in the deck and found some interesting things. I will have to extend my parser a bit.

<img src="https://raw.githubusercontent.com/prendradjaja/fuse/master/JOURNAL.md.d/interesting-cards-misc.jpg">
<img src="https://raw.githubusercontent.com/prendradjaja/fuse/master/JOURNAL.md.d/interesting-cards-numrainbow.jpg">
<img src="https://raw.githubusercontent.com/prendradjaja/fuse/master/JOURNAL.md.d/interesting-cards-quaternary.jpg">
<img src="https://raw.githubusercontent.com/prendradjaja/fuse/master/JOURNAL.md.d/interesting-cards-white-glyphs.jpg">


## To do

- [ ] Change units from pixels to multiples of a slot width? Maybe?
  - [ ] Prereq maybe: Finalize design
- [ ] Unit tests for parser services
- [ ] Use Router to create a devtools page
