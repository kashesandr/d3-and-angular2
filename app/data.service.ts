import { Injectable } from '@angular/core';

import { MatrixData } from './interfaces';

// todo: update to use not a stub
import { MATRIX_DATA } from './mock-matrix-data';

@Injectable()
export class DataService {
  getMatrixData(): Promise<MatrixData> {
    return Promise.resolve(MATRIX_DATA);
  }
}
