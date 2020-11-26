import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  @Output() outInicio = new EventEmitter<Date>();
  @Output() outFin = new EventEmitter<Date>();

  rango: FormGroup;

  constructor() {
    this.rango = new FormGroup({
      inicio: new FormControl(new Date()),
      fin: new FormControl(new Date())
    });
  }

  ngOnInit(): void {
  }


  inicioChange(event: MatDatepickerInputEvent<Date>) {
    this.outInicio.emit(event.value);
  }

  finChange(event: MatDatepickerInputEvent<Date>) {
    this.outFin.emit(event.value);
  }
}
