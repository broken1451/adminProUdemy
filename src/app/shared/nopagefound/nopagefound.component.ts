import { Component, OnInit } from '@angular/core';
declare function initPlugings();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss']
})
export class NopagefoundComponent implements OnInit {

  public anio: number;

  constructor() {
    this.anio = new Date().getFullYear();
  }

  ngOnInit() {
    initPlugings();
  }

}
