export interface IStockSchema {
  stocks: IStock[];
}

interface IStock {
  text: string;
  value: string;
}
