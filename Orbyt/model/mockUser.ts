import { InvestmentCategory, TransactionType, User } from "./models";

export const mockUser: User = {
  id: "1",
  name: "H4t3d",
  email: "h4t3d@email.com",
  financeWallets: [
    {
      id: "1",
      name: "10k up",
      balance: 5000,
      currency: {
        id: "1",
        symbol: "$",
        code: "USD"
      },
      transactions: [
        {
          id: "1",
          description: "Sell car",
          amount: 3000,
          date: new Date(),
          type: TransactionType.OTHER,
          status: "received"
        },
        {
          id: "1",
          description: "Salary",
          amount: 2000,
          date: new Date(),
          type: TransactionType.OTHER,
          status: "received"
        }
      ],
      monthReport: [
        {
          id: "1",
          month: 6,
          year: 2025,
          monthBalance: 2000
        },
         {
          id: "2",
          month: 7,
          year: 2025,
          monthBalance: 5000
        },
         {
          id: "3",
          month: 8,
          year: 2025,
          monthBalance: 3500
        },
         {
          id: "4",
          month: 9,
          year: 2025,
          monthBalance: -1250
        },
         {
          id: "5",
          month: 10,
          year: 2025,
          monthBalance: 5000
        },
      ]
    }
  ],
  investmentWallets: [],
  preferences: {
    defaultCurrency: "",
    language: "",
    dateFormat: "",
    financialYearStart: 0
  }
};
