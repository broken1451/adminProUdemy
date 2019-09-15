import { Component, OnInit } from '@angular/core';

// Servicios
import { SidebarService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menu: any[];

  constructor(public sidebarService: SidebarService) {
    this.menu = sidebarService.menu;
  }

  ngOnInit() {
  }

}
