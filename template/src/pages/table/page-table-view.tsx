import React from 'react'
import { Link } from 'react-router-dom'

const PageTableView = () => {
  const rowId = '123'
  return (
    <div>
      <div>
        PageTableView
        <button>
          <Link to={`/table/${rowId}`}>
            To Detail rowId {rowId}
          </Link>
        </button>
      </div>
    </div>
  )
}

export default PageTableView