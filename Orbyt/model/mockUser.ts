import { User } from "./mockModels";

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
      currency: { id: "USD", symbol: "$" },
      history: [
        { label: "11-2024", value: 1220 },
        { label: "12-2024", value: 1980 },
        { label: "1-2025", value: 1220 },
        { label: "2-2025", value: 1980 },
        { label: "3-2025", value: -1500 },
        { label: "4-2025", value: 780 },
        { label: "5-2025", value: -1500 },
        { label: "6-2025", value: 780 },

      ],
    },
    {
      id: "wallet-2",
      name: "Pig",
      total: 2550,
      incoming: 0,
      outcoming: 0,
      currency: { id: "BRL", symbol: "R$" },
      history: [
        { label: "11-2024", value: 0 },
        { label: "12-2024", value: 720 },
        { label: "1-2025", value: 1250 },
        { label: "2-2025", value: -300 },
        { label: "3-2025", value: 1000 },
        { label: "4-2025", value: 1000 },
     
      ],
    },
        {
      id: "wallet-3",
      name: "Rest",
      total: 0,
      incoming: 0,
      outcoming: 0,
      currency: { id: "BRL", symbol: "R$" },
      history: [],
    },
  ],
};
