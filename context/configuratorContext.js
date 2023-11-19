import { generateRandomId } from '@/utils/randomId'
import { createContext, useEffect, useRef, useState } from 'react'

export const Context = createContext(null)

function GlobalState({ children }) {
  const [configuratorItems, setConfiguratorItems] = useState([])
  const [selectedPfosten, setSelectedPfosten] = useState(null)

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

  // Extrage toate referințele poste_2 într-un array separat
  const referintePoste2 = configuratorItems
    .map((item) => item.node.pfosten_2?.references.edges)
    .flat()
  // Utilizează un set pentru a elimina duplicatatele
  const referinteUnice = Array.from(
    new Set(referintePoste2.map((referinta) => referinta?.node.id))
  )
  // Utilizează referinteUnice în loc de referintePoste2 direct

  const produseFiltrate = referinteUnice.map((id) =>
    referintePoste2.find((referinta) => referinta?.node?.id === id)
  )

  // Filtrarea produselor care au tag-ul "defaultPfoste"
  const defaultPfoste = produseFiltrate.filter((produs) =>
    produs.node.tags.includes('defaultPfoste')
  )

  useEffect(() => {
    if (!selectedPfosten) {
      setSelectedPfosten(defaultPfoste[0])
    }
  }, [defaultPfoste, selectedPfosten])

  return (
    <Context.Provider
      value={{
        dragItem,
        handleSort,
        dragOverItem,
        produseFiltrate,
        selectedPfosten,
        configuratorItems,
        setSelectedPfosten,
        removeFromConfigurator,
        handleAddToConfigurator,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default GlobalState
