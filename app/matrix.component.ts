import {
  Input,
  AfterContentInit,
  Component,
  ElementRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';

import { MatrixData, MatrixOpts } from './interfaces';

declare let d3: any; // reference to window.d3
declare let KashMatrix: any; // reference to window.KashMatrix

@Component( {selector: 'd3-matrix', template: ``})

export class MatrixComponent implements AfterContentInit, OnChanges {

  constructor(private elementRef: ElementRef) {}

  @Input() data: MatrixData = []; // from attributes
  @Input() opts: MatrixOpts = {}; // from attributes
  svgElement: any = null;         // svg
  chartModel: any = KashMatrix(); // chart model, invoked

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
  private optionsUpdate(opts: MatrixOpts){
    if (!opts || !this.chartModel) return;
    for (let key in opts)
      this.chartModel[key](opts[key]);
  }
  ngOnChanges(changes: SimpleChanges) {
    let opts = changes['opts'];
    if (opts) this.optionsUpdate(opts.currentValue);
    let data = changes['data'];
    if (data) this.dataUpdate(data.currentValue);
    if (data || opts) this.render()
  }

}
