import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() revenueTypes: any[] = [];
  selectedValue: string = '';
  @Output() selectedValueChange: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.selectedValue = 'All';
  }
  // @Input() filteredList: any[] = [];

  selectedRevenue(data: any) {
    console.log(data);
    this.selectedValue = data;
    this.selectedValueChange.emit(this.selectedValue);
  }

}
