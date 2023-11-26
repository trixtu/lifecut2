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

    // Caută elementul existent în configuratorItems pe baza unei anumite condiții
    const updatedConfiguratorItems = newItem.map(
      (item) =>
        // Verifică dacă există item.node și dacă id-ul este același cu id-ul lui getCurrentItem
        item?.pfosten?.node?.id && { ...item, id: generateRandomId() }
    )

    const newItemWithIds = newItem.map((item) => ({
      ...item,
      id: generateRandomId(),
      pfosten: selectedPfosten,
    }))

    setConfiguratorItems(newItemWithIds)
    localStorage.setItem('configuratorItems', JSON.stringify(newItemWithIds))
  }

  function handleAddNew(getCurrentItem) {
    let newItem = [...configuratorItems]

    newItem.findIndex((item) => item.node?.id === getCurrentItem?.node.id)

    newItem.push(getCurrentItem)

    // Caută elementul existent în configuratorItems pe baza unei anumite condiții
    const updatedConfiguratorItems = newItem.map(
      (item) =>
        // Verifică dacă există item.node și dacă id-ul este același cu id-ul lui getCurrentItem
        item?.pfosten?.node?.id && { ...item, id: generateRandomId() }
    )

    const newItemWithIds = updatedConfiguratorItems.map((item) => ({
      ...item,
      // id: generateRandomId(),
      // pfosten: selectedPfosten,
    }))

    setConfiguratorItems(newItemWithIds)
    localStorage.setItem('configuratorItems', JSON.stringify(newItemWithIds))
  }

  function addMultipleProducts(getCurrentItem, quantity) {
    //let newItem = [...configuratorItems]

    let newItems = Array.from({ length: quantity }, () => getCurrentItem)

    newItems.findIndex((item) => item.node?.id === getCurrentItem?.node.id)

    //Caută elementul existent în configuratorItems pe baza unei anumite condiții
    const updatedConfiguratorItems = newItems.map(
      (item) =>
        // Verifică dacă există item.node și dacă id-ul este același cu id-ul lui getCurrentItem
        item?.pfosten?.node?.id && { ...item, id: generateRandomId() }
    )

    const newItemWithIds = updatedConfiguratorItems.map((item) => ({
      ...item,
      id: generateRandomId(),
      pfosten: selectedPfosten,
    }))

    setConfiguratorItems(newItemWithIds)
    localStorage.setItem('configuratorItems', JSON.stringify(newItemWithIds))
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

  const handleSelect = (pfosten) => {
    // const defaultPfosten = configuratorItems.filter((pfoste) =>
    //   pfoste.pfosten.node.tags.some((tag) => tag === 'defaultPfoste')
    // )

    // Actualizează selectedPfosten

    // Caută elementul existent în configuratorItems pe baza unei anumite condiții
    const updatedConfiguratorItems = configuratorItems.map(
      (item) =>
        // Verifică dacă există item.node și dacă id-ul este același cu id-ul lui getCurrentItem
        item?.pfosten?.node?.id && { ...item, pfosten: pfosten }
    )

    setSelectedPfosten(pfosten)
    // Actualizează configuratorItems cu elementul modificat
    setConfiguratorItems(updatedConfiguratorItems)

    // Salvează configuratorItems în localStorage
    localStorage.setItem(
      'configuratorItems',
      JSON.stringify(updatedConfiguratorItems)
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
        handleSort,
        handleSelect,
        handleAddNew,
        dragOverItem,
        selectedPfosten,
        configuratorItems,
        setSelectedPfosten,
        addMultipleProducts,
        removeFromConfigurator,
        handleAddToConfigurator,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default GlobalState
