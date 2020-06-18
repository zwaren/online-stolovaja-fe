import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish'

@Component({
  selector: 'app-cooktable',
  templateUrl: './cooktable.component.html',
  styleUrls: ['./cooktable.component.css']
})
export class CooktableComponent implements OnInit {
  dishes = [
    new Dish("Борщ", "first"),
    new Dish("Гречка", "second")
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
