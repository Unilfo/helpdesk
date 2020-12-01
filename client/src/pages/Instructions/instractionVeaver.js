import React, {Fragment, useEffect, useState} from 'react'
import Modal from '@material-ui/core/Modal'
import './instaractionVeaver.css'


import Viewer, {Worker} from '@phuocng/react-pdf-viewer'
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css'



export default function InstractionVeaver({openedInstraction, closeModal, instraction}) {
  const [open, setOpen] = useState(false)
  const [docFile, setDocFile] = useState('')

  useEffect(() => {
    setOpen(openedInstraction)
    setDocFile(instraction)
  }, [openedInstraction])


  const body = (
    <Fragment>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
        <Viewer
          fileUrl={docFile.path}
        />
      </Worker>
    </Fragment>
  )

  return (
    <Modal open={open} onClose={() => closeModal()}>
      {body}
    </Modal>
  )
}

