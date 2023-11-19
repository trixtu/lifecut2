import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export default function Accordion({ children, title }) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="border border-[#dad9d3]">
          <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-sm font-medium text-[#333]  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
            <h2 className="text-xl">{title}</h2>
            <ChevronUpIcon
              className={`${open ? 'rotate-180 transform' : ''} h-8 w-8 `}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
