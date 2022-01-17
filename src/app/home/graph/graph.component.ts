import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { Data } from 'src/app/model/data.model';
import { stringify } from '@angular/compiler/src/util';
import { ProductObject } from 'src/app/model/product.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  @Input() dataList: Array<Data> = [];

  ngOnInit(): void {
    this.findAggregate();
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;


  // line chart data
  data: ChartDataSets[] = [];
  // line chart labels
  months: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
          datasets: this.data,
          labels: this.months
      },
    });
  }


  findAggregate() {
    // let data1 = this.dataList.sort((a, b) => (a.product > b.product) ? 1 : ((b.product > a.product) ? -1 : 0))
    // console.log(data1);
    // console.log(this.dataList);
    
    let products = this.dataList.map(item => item.product).filter((value, index, self) => self.indexOf(value) === index);
    console.log(products);
    
    
    for (let i = 0; i < products.length; i++) {
      let name: string = stringify(products[i]);
      let acv = [];
      for (let k = 0; k < 12; k++) {
        let sum = 0;
        this.dataList.forEach(element => {
          if (element.month == this.months[k] && element.product == products[i]) {
            sum = sum + element.acv;
          }
        });
        acv.push(sum);
      }
      this.data.push(new ProductObject(acv, name));
    }

    console.log(this.data);


    // let data = {
    //   "January": [
    //     {"Product - 1": 0},
    //     {"Product - 2": 0}
    //   ],
    // };

  }

}
