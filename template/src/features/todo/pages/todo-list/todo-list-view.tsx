import React from 'react'

import AuthView from './auth'

interface TodoListViewProps {
  handleLogout: () => void
  isAuthenticated: boolean
}

const TodoListView = ({
  handleLogout,
  isAuthenticated,
}: TodoListViewProps) => {
  return (
    <div>
      <div>
        TodoListView
      </div>
      <div>{
      isAuthenticated ? 'Authenticated' : 'Not Auth'
      }
      </div>
      {isAuthenticated && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {isAuthenticated ? (
        <>Table</>
      ) : (
        <AuthView />
      )}
    </div>
  )
}

export default TodoListView