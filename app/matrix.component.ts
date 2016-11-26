import {
  Input,
  AfterContentInit,
  Component,
  ElementRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';

import { MatrixData, MatrixOptions } from './interfaces';

// todo: refactor this out
declare var d3:any;
declare var KashMatrix:any;

@Component({
  selector: 'd3-matrix',
  template: `<ng-content></ng-content>`
})

export class MatrixComponent implements AfterContentInit, OnChanges {

  constructor(private elementRef: ElementRef) {}

  @Input() data: MatrixData = [];
  @Input() options: MatrixOptions = {};
  chart: any = KashMatrix();
  svg: any;
  render () {
    if (!this.svg || !this.chart) return;
    this.svg.call(this.chart);
  }
  private dataUpdate(data: MatrixData){
    if (!this.svg || !data) return;
    this.svg.datum(data);
  }
  private optionsUpdate(options: MatrixOptions){
    for (let key in options) {
      let val = options[key];
      this.chart[key](val);
    }
  }

  ngAfterContentInit() {
    const element = this.elementRef.nativeElement;
    if (!element) return;
    this.svg = d3.select(element).append("svg");
  }

  ngOnChanges(changes: SimpleChanges) {

    let options = changes['options'];
    if (options && options.currentValue)
      this.optionsUpdate(options.currentValue);

    let data = changes['data'];
    if (data && data.currentValue['length'])
      this.dataUpdate(data.currentValue);

    this.render()
  }

}
