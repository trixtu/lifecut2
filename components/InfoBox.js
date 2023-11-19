import React from 'react'
import Accordion from './ui/Accordion'

function InfoBox({ title, content }) {
  return (
    <div className="mb-6">
      <Accordion title={title}>{content}</Accordion>
    </div>
  )
}

export default InfoBox
