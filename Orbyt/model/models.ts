export type Currency = {
  id: string;
  symbol: string;
  code: string;
};


export enum TransactionType {
  FOOD = "FOOD",
  HEALTH = "HEALTH",
  OTHER = "OTHER"
}

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  status: "pending" | "paid" | "received";
};

export type MonthReport = {
  id: string;
  month: number;
  year: number;
  monthBalance: number;
}

export type FinanceWallet = {
  id: string;
  name: string;
  balance: number;
  currency?: Currency;
  transactions?: Transaction[];
  monthReport?: MonthReport[];
};

export enum InvestmentCategory {
  STOCK = "STOCK",
  FII = "FII",
  ETF = "ETF",
  CRYPTO = "CRYPTO",
  FIXED_INCOME = "FIXED_INCOME"
}

export type Investment = {
  id: string;
  ticker: string;
  category: InvestmentCategory;
  quantity: number;
  currentPrice: number;
};

export type InvestmentWallet = {
  id: string;
  name: string;
  currency: Currency;
  investments: Investment[];
};

export type UserPreferences = {
  defaultCurrency: string;
  language: string;
  dateFormat: string;
  financialYearStart: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  financeWallets: FinanceWallet[];
  investmentWallets: InvestmentWallet[];
  preferences: UserPreferences;
};
