import { useContext } from 'react'
import { StoreContext } from '../store/storeContext.js'

export function useAppStore() {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('useAppStore must be used inside StoreProvider')
  }

  return store
}
