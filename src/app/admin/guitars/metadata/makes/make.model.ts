export class Make {
  public makeID: number;
  public value: string;
  public addDate: Date;

  constructor(MakeID: number,
              Value: string,
              AddDate: Date) {

      this.makeID = MakeID;
      this.value = Value;
      this.addDate = AddDate;
  }
}
