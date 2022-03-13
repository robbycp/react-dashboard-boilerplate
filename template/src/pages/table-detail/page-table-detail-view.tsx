import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import Dialog from 'components/dialog/basic'
import withConfirmation, { useConfirmation } from 'app/hoc/withConfirmation'

const PageTableDetailView = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { rowId } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { openConfirmation } = useConfirmation()

  const handleBack = () => {
    navigate('/table')
  }
  const handleConfirm = () => {
    openConfirmation({
      title: 'Confirm Something',
      message: 'Message when you confirm something to do the action',
      textButtonCancel: 'tutup',
      textButtonConfirm: 'Submit',
      onSubmit: () => {
        console.log('onSubmit confirm')
      },
      onClose: () => {
        console.log('onClose confirm')
      }
    })
  }
  return (
    <div>
      <div>
        <button onClick={handleBack}>
          Back
        </button>
        <button onClick={() => enqueueSnackbar('Show snackbar')}>
          Show Snackbar in Component
        </button>
        PageTableDetailView {rowId}
      </div>
      <div>
        <button onClick={() => setIsModalOpen(true)}>
          Open modal
        </button>
        <Dialog
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            console.log('Submit modal')
          }}
          title="Table Detail Modal"
          textButtonConfirm='Submit'
        >
          <div>
            modal open
          </div>
        </Dialog>
      </div>
      <div>
        <button onClick={handleConfirm}>
          Confirm something
        </button>
      </div>
    </div>
  )
}

export default withConfirmation(PageTableDetailView)