export type Currency = {
  id: string;
  symbol: string; 
  code: string;    
};

export type WalletHistory = {
  id: string;
  date: Date;       
  value: number;   
};

export type Wallet = {
  id: string;
  name: string;
  total: number;
  incoming: number;
  outcoming: number;
  currency: Currency;
  history: WalletHistory[];
};

export type User = {
  id: string;
  name: string;
  wallets: Wallet[];
};
