import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const PageTableDetailView = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { rowId } = useParams()
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/table')
  }
  return (
    <div>
      <button onClick={handleBack}>
        Back
      </button>
      <button onClick={() => enqueueSnackbar('Show snackbar')}>
        Show Snackbar in Component
      </button>
      PageTableDetailView {rowId}
      
    </div>
  )
}

export default PageTableDetailView