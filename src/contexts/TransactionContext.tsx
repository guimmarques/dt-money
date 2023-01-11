import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider(props: TransactionsProviderProps) {
  const { children } = props;

  const [transactions, setTransations] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/transactions")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTransations(data);
      });
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
