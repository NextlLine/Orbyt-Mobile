import { User, WalletHistory } from "./models";

function generateMockHistory(months: number = 6): WalletHistory[] {
  const now = new Date();
  const data: WalletHistory[] = [];

  for (let i = 0; i < months; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.unshift({
      id: `hist-${i}`,
      date: d,
      value: Math.floor(Math.random() * 2000 - 1000), 
    });
  }

  return data;
}

export const mockUser: User = {
  id: "user-1",
  name: "Jairo",
  wallets: [
    {
      id: "wallet-1",
      name: "10K Target",
      total: 10569.3,
      incoming: 500,
      outcoming: 20,
      currency: {
        id: "cur-1",
        symbol: "$",
        code: "USD",
      },
      history: generateMockHistory(12), 
    },
    {
      id: "wallet-2",
      name: "Crypto Bag",
      total: 2500.75,
      incoming: 1000,
      outcoming: 300,
      currency: {
        id: "cur-2",
        symbol: "₿",
        code: "BTC",
      },
      history: generateMockHistory(8), 
    },
    {
      id: "wallet-3",
      name: "Rest",
      total: 0,
      incoming: 0,
      outcoming: 0,
      currency: {
        id: "cur-3",
        symbol: "R$",
        code: "BRL",
      },
      history: [],
    },
  ],
};
