import { generateRandomId } from '@/utils/randomId'
import { createContext, useEffect, useRef, useState } from 'react'

export const Context = createContext(null)

function GlobalState({ children }) {
  const [configuratorItems, setConfiguratorItems] = useState([])

  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  function handleAddToConfigurator(getCurrentItem) {
    let newItem = [...configuratorItems]

    newItem.findIndex((item) => item.node?.id === getCurrentItem?.node.id)

    newItem.push(getCurrentItem)

    const newItemWithIds = newItem.map((item) => ({
      ...item,
      id: generateRandomId(),
    }))

    setConfiguratorItems(newItemWithIds)
    localStorage.setItem('configuratorItems', JSON.stringify(newItem))
  }

  function removeFromConfigurator(getCurrentId) {
    let cpyItems = [...configuratorItems]
    cpyItems = cpyItems.filter((item, index) => item.id !== getCurrentId)

    setConfiguratorItems(cpyItems)
    localStorage.setItem('configuratorItems', JSON.stringify(cpyItems))
  }

  const handleSort = () => {
    let _configuratorItems = [...configuratorItems]

    const draggedItemContent = _configuratorItems.splice(dragItem.current, 1)[0]

    _configuratorItems.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = null
    dragOverItem.current = null

    setConfiguratorItems(_configuratorItems)

    localStorage.setItem(
      'configuratorItems',
      JSON.stringify(_configuratorItems)
    )
  }

  useEffect(() => {
    setConfiguratorItems(
      JSON.parse(localStorage.getItem('configuratorItems')) || []
    )
  }, [])

  return (
    <Context.Provider
      value={{
        dragItem,
        dragOverItem,
        handleSort,
        configuratorItems,
        handleAddToConfigurator,
        removeFromConfigurator,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default GlobalState
