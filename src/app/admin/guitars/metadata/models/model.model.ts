import { Make } from './../makes/make.model';
export class Model {
  public id: string;
  public value: string;
  public addDate: Date;

  constructor(id: string,
              Value: string,
              AddDate: Date) {

      this.id = id;
      this.value = Value;
      this.addDate = AddDate;
  }
}
