export class Make {
  public id: string;
  public value: string;
  public addDate: Date;

  constructor(MakeID: string,
              Value: string,
              AddDate: Date) {

      this.id = MakeID;
      this.value = Value;
      this.addDate = AddDate;
  }
}
