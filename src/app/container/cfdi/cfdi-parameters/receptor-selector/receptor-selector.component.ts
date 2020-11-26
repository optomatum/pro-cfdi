import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReceptorModel} from "../../../../shared/model/receptor.model";

@Component({
  selector: 'app-receptor-selector',
  templateUrl: './receptor-selector.component.html',
  styleUrls: ['./receptor-selector.component.scss']
})
export class ReceptorSelectorComponent implements OnInit {

  @Input() receptores: ReceptorModel[];
  @Output() receptorSelected = new EventEmitter<ReceptorModel>();
  selected: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeReceptor(value: ReceptorModel) {
    this.receptorSelected.emit(value);
  }
}
