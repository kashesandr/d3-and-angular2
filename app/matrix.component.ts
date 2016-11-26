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

  svgElement: any = {};
  chartModel: any = KashMatrix();

  render () {
    if (!this.svgElement || !this.chartModel) return;
    this.svgElement.call(this.chartModel); // render the chart
  }

  private dataUpdate(data: MatrixData){
    if (!this.svgElement || !data['length']) return;
    this.svgElement.datum(data);
  }

  private optionsUpdate(options: MatrixOptions){
    if (!options) return;
    for (let key in options)
      this.chartModel[key](options[key]);
  }

  ngAfterContentInit() {
    const element = this.elementRef.nativeElement;
    if (!element) return;
    this.svgElement = d3.select(element).append("svgElement");
  }

  ngOnChanges(changes: SimpleChanges) {

    let options = changes['options'];
    if (options) this.optionsUpdate(options.currentValue);

    let data = changes['data'];
    if (data) this.dataUpdate(data.currentValue);

    this.render()
  }

}
