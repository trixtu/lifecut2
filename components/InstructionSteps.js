import React from 'react'

const InstructionSteps = ({ title, stepOne, stepTwo, stepThree }) => {
  return (
    <div className="InstructionSteps">
      <section className="InstructionSteps-Content">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">{title}</h1>

          <button className="text-red-500 font-semibold" type="button">
            Anleitung ausblenden
          </button>
        </div>

        <h2 className="text-xl mb-4">In drei Schritten zu Ihrem Wunschzaun</h2>
        <ol className="items-center w-full space-y-4 md:flex md:space-x-8 md:space-y-0 rtl:space-x-reverse">
          <li className="flex items-center text-neutral-800 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 text-6xl text-white shrink-0 font-bold">
              1
            </span>
            <span>
              <p className="text-sm">{stepOne}</p>
            </span>
          </li>
          <li className="flex items-center text-neutral-800 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 text-6xl text-white shrink-0 font-bold">
              2
            </span>
            <span>
              <p className="text-sm">{stepTwo}</p>
            </span>
          </li>
          <li className="flex items-center text-neutral-800 space-x-2.5 rtl:space-x-reverse">
            <span className="flex items-center justify-center w-10 h-10 text-6xl text-white shrink-0 font-bold">
              3
            </span>
            <span>
              <p className="text-sm">{stepThree}</p>
            </span>
          </li>
        </ol>
      </section>
    </div>
  )
}

export default InstructionSteps
