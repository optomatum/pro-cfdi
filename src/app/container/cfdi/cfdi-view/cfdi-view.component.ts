import {AfterContentChecked, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CfdiModel} from "../../../shared/model/cfdi.model";


@Component({
  selector: 'app-cfdi-view',
  templateUrl: './cfdi-view.component.html',
  styleUrls: ['./cfdi-view.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CfdiViewComponent implements OnInit, DoCheck, AfterContentChecked, OnChanges {
  @Input() cfdiJson: CfdiModel;
  cfdi: CfdiModel = new CfdiModel();


  constructor() {
    // console.log(this.cfdi.conceptos);
  }

  ngOnInit() {
    // console.log('on init');
    // console.log(this.cfdi.conceptos);
  }

  ngAfterContentChecked() {
    /*    if (this.cfdi) {
          this.cfdiview = JSON.stringify(this.cfdi);
        }*/
    // console.log('on after content checked');
    // console.log(this.cfdi.conceptos);
  }

  ngDoCheck() {
    // if (this.cfdi) {
    //   this.cfdiview = JSON.stringify(this.cfdi);
    // }
    // console.log('on docheck');
    // console.log(this.cfdi.conceptos);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentValue !== null) {
      this.cfdi = this.cfdiJson;

    }


  }

}

