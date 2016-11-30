import {
  Input,
  AfterContentInit,
  Component,
  ElementRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';

import { MatrixData, MatrixOptions } from './interfaces';

declare let d3: any; // reference to window.d3
declare let KashMatrix: any; // reference to window.KashMatrix

@Component({
  selector: 'd3-matrix',
  template: ``
})

export class MatrixComponent implements AfterContentInit, OnChanges {

  // necessary to get the element
  constructor(private elementRef: ElementRef) {}
  // data provided by attributes
  @Input() data: MatrixData = [];
  @Input() options: MatrixOptions = {};
  svgElement: any = null;
  chartModel: any = KashMatrix();

  ngAfterContentInit() {
    const element = this.elementRef.nativeElement;
    if (!element) return;
    this.svgElement = d3.select(element).append("svg");
  }

  render () {
    if (!this.svgElement || !this.chartModel) return;
    this.svgElement.call(this.chartModel); // render the chart
  }

  private dataUpdate(data: MatrixData){
    if (!this.svgElement || !data['length']) return;
    this.svgElement.datum(data);
  }

  private optionsUpdate(options: MatrixOptions){
    if (!options || !this.chartModel) return;
    for (let key in options)
      this.chartModel[key](options[key]);
  }

  ngOnChanges(changes: SimpleChanges) {
    let opts = changes['options'];
    if (opts) this.optionsUpdate(opts.currentValue);
    let data = changes['data'];
    if (data) this.dataUpdate(data.currentValue);
    if (data || opts) this.render()
  }

}
