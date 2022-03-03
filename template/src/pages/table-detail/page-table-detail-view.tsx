import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PageTableDetailView = () => {
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
      PageTableDetailView {rowId}
      
    </div>
  )
}

export default PageTableDetailView