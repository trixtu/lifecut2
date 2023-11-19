import React, { useState } from 'react'
import styles from '@/styles/ConfiguratorOptios.module.css'
import SelectBox from './ui/SelectBox'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

const pfosten = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]
const befestigung = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]
const ConfiguratorOptions = () => {
  const [selectedPfosten, setSelectedPfosten] = useState(pfosten[0])
  const [selectedBefestigung, setSelectedBefestigung] = useState(befestigung[0])

  return (
    <div className={styles.ConfiguratorOptions}>
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="px-4 pt-0 pb-3 capitalize bg-neutral-200">
          <h2 className="flex items-center">
            Pfosten <InformationCircleIcon className="w-6 h-6" />
          </h2>
          <SelectBox
            selected={selectedPfosten}
            setSelected={setSelectedPfosten}
            data={pfosten}
          />
        </div>
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
