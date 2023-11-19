import React from 'react'

const InstructionSteps = () => {
  return (
    <div classNameName="InstructionSteps bg-gray-200 p-4">
      <section className="InstructionSteps-Content">
        <div classNameName="InstructionSteps-Header">
          <h1 classNameName="InstructionSteps-Title">
            Willkommen beim Zaunplaner von www.hoerner-gmbh.com
          </h1>

          <button className="InstructionSteps-Button _close" type="button">
            Anleitung ausblenden
          </button>
        </div>

        <h2 className="InstructionSteps-Subtitle">
          In drei Schritten zu Ihrem Wunschzaun
        </h2>

        <ol className="InstructionSteps-Steps">
          <li className="InstructionSteps-Step _1">
            <span>
              Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der
              Übersicht mit der Maus auf die Rasenfläche ziehen. Länge und Preis
              werden immer angezeigt.
            </span>
          </li>

          <li className="InstructionSteps-Step _2">
            <span>
              Wählen Sie die gewünschten Pfosten, die bevorzugte Befestigungsart
              und ggf. extra Zubehör aus.
            </span>
          </li>

          <li className="InstructionSteps-Step _3">
            <span>
              Mit dem Klick auf den weiter -Button landet Ihre komplette
              Zaunanlage im Warenkorb. Falls Sie Ihren Wunschzaun später noch
              einmal aufrufen möchten, einfach auf speichern klicken.
            </span>
          </li>
        </ol>
      </section>
    </div>
  )
}

export default InstructionSteps
