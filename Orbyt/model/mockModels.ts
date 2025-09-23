export type Currency = {
  id: string;
  symbol: string;
};

export type GraphC = {
  label: string; 
  value: number;
};

export type Wallet = {
  id: string;
  name: string;
  total: number;
  incoming: number;
  outcoming: number;
  currency: Currency;
  history: GraphC[];
};

export type User = {
  id: string;
  name: string;
  wallets: Wallet[];
};
