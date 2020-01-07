import { Make } from './../makes/make.model';
export class Model {
  public modelID: string;
  public value: string;
  public addDate: Date;

  constructor(modelID: string,
              Value: string,
              AddDate: Date) {

      this.modelID = modelID;
      this.value = Value;
      this.addDate = AddDate;
  }
}
