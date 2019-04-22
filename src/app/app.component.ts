import { Component } from "@angular/core";

export enum DieColor {
  red = "red",
  yellow = "yellow",
  green = "green",
  blue = "blue",
  black = "black"
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "fuse";
}
