export class TireWagon {
  private mainTires: number;
  private noseTires: number;

  constructor(mainTires: number, noseTires?: number) {
    this.mainTires = mainTires;
    this.noseTires = noseTires;
  }

  getTireAmount() {
    return this.noseTires + this.mainTires;
  }

}
