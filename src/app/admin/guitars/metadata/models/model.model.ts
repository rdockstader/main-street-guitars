import { Make } from './../makes/make.model';
export class Model {
  public modelID: number;
  public value: string;
  public addDate: Date;

  constructor(modelID: number,
              Value: string,
              AddDate: Date) {

      this.modelID = modelID;
      this.value = Value;
      this.addDate = AddDate;
  }
}
