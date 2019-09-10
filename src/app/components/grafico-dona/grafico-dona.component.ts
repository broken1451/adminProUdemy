import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
    @Input() ChartLabels: any[] = [];
    @Input() ChartData: any[] = [];
    @Input() ChartType: any = '';
    @Input() Chartcolor: any[];
  constructor() { }

  ngOnInit() {
  }

}
