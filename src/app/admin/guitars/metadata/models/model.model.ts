import { Make } from './../makes/make.model';
export class Model {
  public modelID: number;
  public value: string;
  public make: Make;
  public addDate: Date;

  constructor(modelID: number,
              Value: string,
              Make: Make,
              AddDate: Date) {

      this.modelID = modelID;
      this.value = Value;
      this.make = Make;
      this.addDate = AddDate;
  }
}
