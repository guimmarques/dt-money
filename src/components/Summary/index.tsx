import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { useContext } from "react";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {
  const { transactions } = useContext(TransactionContext);

  const summary = transactions.reduce(
    (acc, transacation) => {
      if (transacation.type === "income") {
        acc.income += transacation.price;
        acc.total += transacation.price;
      }

      if (transacation.type === "outcome") {
        acc.outcome += transacation.price;
        acc.total -= transacation.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saíds</span>
          <ArrowCircleDown size={32} color="#f75A68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
