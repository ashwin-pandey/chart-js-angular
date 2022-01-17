import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { toArray } from 'rxjs/operators';
import { Data } from '../model/data.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  completeList: any[] = [];
  list: Array<Data> = [];

  @Input() revenueSelected: any = '';

  ngOnInit(): void {
    this.getDataList();
  }

  load: Boolean = false;

  selectedRevenueChanged(data: any) {
    let output = [];

    if (data != "All") {
      output = this.completeList.filter(obj => {
        return obj.revenue_type == data
      });
    } else {
      output = this.completeList;
    }

    this.list = output;
  }

  distinctRevenueTypes: any[] = [];
  getDropdownValues() {
    let unique: any[] = [];

    for (let i = 0; i < this.completeList.length; i++) {
      if (!unique[this.completeList[i].revenue_type]) {
        this.distinctRevenueTypes.push(this.list[i].revenue_type);
        unique[this.completeList[i].revenue_type] = 1;
      }
    }
  }

  getDataList() {
    this.dataService.getList().subscribe((item: any[]) => {
      this.list = item;
      this.completeList = item;
      this.getDropdownValues();
      this.load = true;
    });
  }


}
