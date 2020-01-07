export class Make {
  public makeID: string;
  public value: string;
  public addDate: Date;

  constructor(MakeID: string,
              Value: string,
              AddDate: Date) {

      this.makeID = MakeID;
      this.value = Value;
      this.addDate = AddDate;
  }
}
