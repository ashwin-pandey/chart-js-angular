import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/model/data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataList: Array<Data> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
