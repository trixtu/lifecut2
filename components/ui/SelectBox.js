import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid'

function SelectBox({ selected, setSelected, data }) {
  return (
    <Listbox onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-sm bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected?.node?.title}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center bg-red-500 justify-center w-10">
            <ChevronDownIcon
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border-neutral-600">
            {data?.map((poste, posteIdx) => (
              <Listbox.Option
                key={posteIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-[#3f3f3f] text-white' : 'text-gray-900'
                  }`
                }
                value={poste}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {poste.node.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default SelectBox
