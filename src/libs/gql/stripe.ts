export interface StripeTrx {
  __typename: 'ProcessTrx';
  publishableKey: string;
  clientSecret: string;
}
export interface StripeTrx_Trx {
  processTransaction: StripeTrx;
}
export interface StripeTrxVariables {
  amount: number[];
  currency: string;
}
