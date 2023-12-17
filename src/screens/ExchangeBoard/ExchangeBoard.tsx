import { ActivityIndicator, FlatList, Text } from 'react-native'
import React, { FC } from 'react'
import { useCurrentExchangeBoard } from '../../hooks/useCurrentExchangeBoard.ts'
import { ExchangeBoardItem } from './components/ExchangeBoardItem.tsx'

export const ExchangeBoard: FC = () => {
  const queryResult = useCurrentExchangeBoard()

  if (queryResult.isLoading) {
    return <ActivityIndicator />
  }

  if (!queryResult.data) {
    // TODO: Figure out & make error nicer
    // TODO: Retry initialization?
    const error = queryResult.error?.toString() ?? 'Unknown error'
    return <Text>{error}</Text>
  }

  return (
    <FlatList
      data={queryResult.data.currencies}
      refreshing={queryResult.isRefetching}
      onRefresh={queryResult.refetch}
      renderItem={(item) => <ExchangeBoardItem foreignCurrency={item.item} localCurrencyCode={'CZK'} />}
    />
  )
}
