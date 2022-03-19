import React from 'react'

import { useTodoAdd } from 'features/todo/services/hooks/useTodo'

import CreateView from './create-view'

const CreateContainer = () => {
  const todoAdd = useTodoAdd()
  const [description, setDescription] = React.useState('')
  const handleCreateTodo = () => {
    todoAdd.mutate({ description }, {
      onSuccess: () => {
        setDescription('')
      }
    })
  }

  const propsView = {
    description,
    handleCreateTodo,
    setDescription,
  }
  return <CreateView {...propsView} />
}

export default CreateContainer