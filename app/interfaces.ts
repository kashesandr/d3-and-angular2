// data for matrix

export interface MatrixData {
  [index: number]: number
}

export interface MatrixOptions {
  [method: string]: any;
}

export class Matrix {
  data: MatrixData;
  options: MatrixOptions;
}
