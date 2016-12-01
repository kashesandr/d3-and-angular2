// data for matrix

export interface MatrixData {
  [index: number]: number
}

export interface MatrixOpts {
  [method: string]: any;
}

export class Matrix {
  data: MatrixData;
  opts: MatrixOpts;
}
