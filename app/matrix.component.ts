import { AfterContentInit, Component, ElementRef } from '@angular/core';
declare var d3:any;
declare var KashMatrix:any;

@Component({
  selector: 'd3-matrix',
  template: `<ng-content></ng-content>`
})

export class MatrixComponent implements AfterContentInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit() {

    const chart = KashMatrix();
    const element = this.elementRef.nativeElement;

    let matrix = {
      data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      options: {
        width: 400,
        height: 400
      }
    };

    for (let key in matrix.options) {
      let val = matrix.options[key];
      chart[key](val);
    }

    let svg = d3.select(element).append("svg");

    svg.datum(matrix.data).call(chart)
  }

}
