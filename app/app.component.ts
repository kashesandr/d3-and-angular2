import { Component, OnInit } from '@angular/core';

import { Matrix, MatrixOptions } from './interfaces';
import { DataService } from './data.service';

// options to be applied to chart
const options: MatrixOptions = { width: 400, height: 400 };

@Component({
  selector: 'my-app',
  providers: [DataService],
  styles: [`#app { width: 400px; margin: auto; }`],
  template: `
    <div id="app">
        <d3-matrix [data]="matrix.data" [options]="matrix.options" ></d3-matrix>
    </div>
  `
})

export class AppComponent implements OnInit {
  matrix: Matrix;
  constructor(private dataService: DataService) {
    this.matrix = { data: [], options: options };
  }
  ngOnInit(): void {
    this.dataService.getMatrixData().then(
      data => this.matrix.data = data
    );
  }
}
