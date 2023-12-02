import React, { useContext, useEffect } from 'react'
import styles from '@/styles/ConfiguratorOptios.module.css'
import SelectBox from './ui/SelectBox'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Context } from '@/context/configuratorContext'
import { Popover } from 'antd'

const ConfiguratorOptions = ({ filteredZaunserie }) => {
  const {
    selectedPfosten,
    setSelectedPfosten,
    handleSelect,
    configuratorItems,
  } = useContext(Context)

  const content = (
    <div className="max-w-[150px] text-xs">
      {filteredZaunserie.length > 0 &&
        filteredZaunserie.map((p) => (
          <p key={p.key}>
            {p?.reference?.fields
              .find((f) => f.key === 'hinweis')
              .value.replace('!\n', ' ')}
          </p>
        ))}
    </div>
  )

  const data = filteredZaunserie?.map(
    (z) =>
      z?.reference?.fields.find((f) => f.key === 'pfosten').references.edges[0]
  )

  const defaultPfoste = data?.filter((pfoste) =>
    pfoste?.node?.tags.some((tag) => tag === 'defaultPfoste')
  )
  const defaultPfosteFinal = defaultPfoste[0]

  useEffect(() => {
    if (!selectedPfosten) {
      setSelectedPfosten(defaultPfosteFinal)
    }
  }, [defaultPfosteFinal, selectedPfosten, setSelectedPfosten])

  return (
    <div className={styles.ConfiguratorOptions}>
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredZaunserie && (
          <div className="px-4 pt-0 pb-3 capitalize bg-neutral-200">
            <h2 className="flex items-center gap-1">
              Pfosten
              <Popover placement="top" content={content} className="">
                <InformationCircleIcon className="w-6 h-6" />
              </Popover>
            </h2>

            <SelectBox
              selected={selectedPfosten}
              setSelected={setSelectedPfosten}
              filteredZaunserie={filteredZaunserie}
              handleSelect={handleSelect}
              configuratorItems={configuratorItems}
            />
          </div>
        )}

        {/* <div className="px-4 pt-0 pb-3 capitalize bg-neutral-200">
          <h2 className="flex items-center">
            Befestigung <InformationCircleIcon className="w-6 h-6" />
          </h2>
          <SelectBox
            selected={selectedBefestigung}
            setSelected={setSelectedBefestigung}
            data={befestigung}
            //defaultValue={defaultPfoste}
          />
        </div> */}
      </div>
    </div>
  )
}

export default ConfiguratorOptions
