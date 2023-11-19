import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/ConfiguratorOptios.module.css'
import SelectBox from './ui/SelectBox'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Context } from '@/context/configuratorContext'

const befestigung = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]
const ConfiguratorOptions = () => {
  const {
    defaultPfoste,
    selectedPfosten,
    setSelectedPfosten,
    produseFiltrate,
  } = useContext(Context)

  const [selectedBefestigung, setSelectedBefestigung] = useState(befestigung[0])

  return (
    <div className={styles.ConfiguratorOptions}>
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {produseFiltrate && (
          <div className="px-4 pt-0 pb-3 capitalize bg-neutral-200">
            <h2 className="flex items-center gap-1">
              Pfosten
              <InformationCircleIcon className="w-6 h-6" />
            </h2>

            <SelectBox
              selected={selectedPfosten}
              setSelected={setSelectedPfosten}
              data={produseFiltrate}
            />
          </div>
        )}

        <div className="px-4 pt-0 pb-3 capitalize bg-neutral-200">
          <h2 className="flex items-center">
            Befestigung <InformationCircleIcon className="w-6 h-6" />
          </h2>
          <SelectBox
            selected={selectedBefestigung}
            setSelected={setSelectedBefestigung}
            data={befestigung}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfiguratorOptions
