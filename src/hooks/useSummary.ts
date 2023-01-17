import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../contexts/TransactionContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
    (acc, transacation) => {
      if (transacation.type === 'income') {
        acc.income += transacation.price
        acc.total += transacation.price
      }

      if (transacation.type === 'outcome') {
        acc.outcome += transacation.price
        acc.total -= transacation.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}
