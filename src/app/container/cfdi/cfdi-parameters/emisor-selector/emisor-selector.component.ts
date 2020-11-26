import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmisorModel} from "../../../../shared/model/emisor.model";

@Component({
  selector: 'app-emisor-selector',
  templateUrl: './emisor-selector.component.html',
  styleUrls: ['./emisor-selector.component.scss']
})
export class EmisorSelectorComponent implements OnInit {
  @Input() emisores: EmisorModel[];
  @Output() emisorSelected = new EventEmitter<EmisorModel>();
  selected: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeEmisor(value: EmisorModel) {
    this.emisorSelected.emit(value);
  }
}
