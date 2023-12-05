import React, { Fragment, useContext } from 'react'
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CartContext } from '@/context/shopContext'

function ModalAddToCart({ isOpen, setIsOpen, items }) {
  const { addMultipleToCart } = useContext(CartContext)

  function closeModal() {
    setIsOpen(false)
  }

  function addToCart() {
    addMultipleToCart(items)
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="relative text-lg font-medium leading-6 text-gray-900 p-4"
                >
                  Kundeninformation
                  <button
                    className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-sm "
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Dialog.Title>
                <div className="mt-2 p-4">
                  <p className="text-sm text-gray-500">
                    Auf der folgenden Warenkorb-Seite finden Sie eine
                    vollständige Auflistung der bisher gewählten Artikel. Hier
                    haben Sie die Möglichkeit die Einkaufsliste ggf. Ihren
                    individuellen Bedürfnissen anzupassen und abschließend zu
                    prüfen. Sie können also nachträglich Elemente entfernen oder
                    andere hinzufügen.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full inline-flex items-center gap-1 justify-center rounded-sm border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                    onClick={addToCart}
                  >
                    <span>Zaun in den Warenkorb legen</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalAddToCart
