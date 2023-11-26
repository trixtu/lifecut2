import React, { Fragment, useState } from 'react'
import { Input, Typography } from 'antd'
import { Dialog, Transition } from '@headlessui/react'

const ModalAddMultiple = ({
  isOpen,
  closeModal,
  addMultipleProducts,
  ultimulProdus,
}) => {
  const [width, setWidth] = useState(null)

  function addProducts() {
    let widthFinal = 0
    if (!width) {
      return
    }

    console.log(ultimulProdus)
    const widthElement =
      ultimulProdus?.node?.options.find((o) => o.name === 'Breite').values[0] /
      100

    if (width > 2 * parseFloat(widthElement)) {
      widthFinal = parseFloat(width) / parseFloat(widthElement)
    }
    addMultipleProducts(ultimulProdus, Math.floor(parseFloat(widthFinal)))
    closeModal()
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="p-8">
                  <div className="absolute right-4 top-2 font-semibold hover:text-red-500">
                    <button onClick={closeModal}>
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    Automatisch auffüllen
                  </Dialog.Title>
                </div>
                <div className="px-8 pb-8">
                  <form>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bitte gib die gewünschte Zaunlänge an, bis zu der der
                        Zaun automatisch mit dem letzten Zaunelement aufgefüllt
                        werden soll.
                      </p>
                    </div>

                    <div className="mt-4 mb-4">
                      <div>
                        <Typography.Title level={5}>
                          Gewünschte Zaunlänge (in m)
                        </Typography.Title>
                        <Input
                          placeholder="Zaunlänge eingeben"
                          className="rounded-none"
                          onChange={(e) => setWidth(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center float-right  border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={addProducts}
                    >
                      Auffüllen
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalAddMultiple
